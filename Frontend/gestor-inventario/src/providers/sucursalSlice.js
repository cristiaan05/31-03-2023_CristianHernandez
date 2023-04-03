import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getSucursalesAll = createAsyncThunk(

    'getSucursales',
    async () => {
        try {
            const response = await fetch('http://localhost:3800/getSucursales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseJson = await response.json();
            return { sucursales: responseJson.sucursales }
        } catch (error) {
            console.log(error);
            //console.log("geg")
            return { sucursales: null }
        }
    }
)

const initialState = {
    sucursales: null,
    rutaSucursal:'/sucursales'
}


export const sucursalSlice = createSlice({
    name: 'sucursales',
    initialState: initialState,
    reducers: {
        getSucursales: (state, action) => {
            //console.log(action)
            state.sucursales = action.payload.sucursales;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSucursalesAll.fulfilled, (state, action) => {
            //state.statusByName[action.meta.arg] = 'fulfilled'
            state.sucursales = action.payload.sucursales
        })
    },
});

export const { getSucursales } = sucursalSlice.actions;
export default sucursalSlice.reducer;