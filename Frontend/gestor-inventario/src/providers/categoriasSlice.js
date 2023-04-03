import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getCategoriasAll = createAsyncThunk(

    'getCategorias',
    async () => {
        try {
            const response = await fetch('http://localhost:3800/getCategories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseJson = await response.json();
            return { categorias: responseJson.categorias }
        } catch (error) {
            console.log(error);
            //console.log("geg")
            return { categorias: null }
        }
    }
)

const initialState = {
    categorias: null,
    ruta:'/categorias'
}


export const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: initialState,
    reducers: {
        getCategorias: (state, action) => {
            //console.log(action)
            state.categorias = action.payload.categorias;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriasAll.fulfilled, (state, action) => {
            //state.statusByName[action.meta.arg] = 'fulfilled'
            state.categorias = action.payload.categorias
        })
    },
});

export const { getCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;