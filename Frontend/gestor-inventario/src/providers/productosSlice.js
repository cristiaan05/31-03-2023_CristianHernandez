import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getProductosAll = createAsyncThunk(

    'getProductos',
    async () => {
        try {
            const response = await fetch('http://localhost:3800/getProducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseJson = await response.json();
            return { productos: responseJson.productos }
        } catch (error) {
            console.log(error);
            //console.log("geg")
            return { productos: null }
        }
    }
)

const initialState = {
    productos: null,
    rutaProducto:'/productos'
}


export const productosSlice = createSlice({
    name: 'productos',
    initialState: initialState,
    reducers: {
        getProductos: (state, action) => {
            //console.log(action)
            state.productos = action.payload.productos;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductosAll.fulfilled, (state, action) => {
            //state.statusByName[action.meta.arg] = 'fulfilled'
            state.productos = action.payload.productos
        })
    },
});

export const { getProductos } = productosSlice.actions;
export default productosSlice.reducer;