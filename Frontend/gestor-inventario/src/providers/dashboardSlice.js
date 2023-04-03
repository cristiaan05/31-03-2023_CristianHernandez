import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getInventariosBy = createAsyncThunk(

    'getInventarios',
    async () => {
        //const {id_bank_account,category,startDate,endDate}=filterData     654627468
        try {
            //const token = window.localStorage.getItem('usertoken');
            const response = await fetch('http://localhost:3800/getInventarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseJson = await response.json();
            //console.log("gg",responseJson.inventarios)
            return { inventarios: responseJson.inventarios }
        } catch (error) {
            console.log(error);
            //console.log("geg")
            return { inventarios: null }
        }
    }
)

const initialState = {
    inventarios: null,
}


export const inventariosSlice = createSlice({
    name: 'inventarios',
    initialState: initialState,
    reducers: {
        getInventarios: (state, action) => {
            //console.log(action)
            state.inventarios = action.payload.inventarios;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInventariosBy.fulfilled, (state, action) => {
            //state.statusByName[action.meta.arg] = 'fulfilled'
            state.inventarios = action.payload.inventarios
        })
    },
});

export const { getInventarios } = inventariosSlice.actions;
export default inventariosSlice.reducer;