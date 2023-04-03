import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { inventariosSlice } from "./dashboardSlice";
import { categoriasSlice } from "./categoriasSlice";
import { productosSlice } from "./productosSlice";
import { sucursalSlice } from "./sucursalSlice";

export const store = configureStore({
    reducer: combineReducers({
        inventarios: inventariosSlice.reducer,
        categorias: categoriasSlice.reducer,
        productos: productosSlice.reducer,
        sucursales: sucursalSlice.reducer,
    })
})

