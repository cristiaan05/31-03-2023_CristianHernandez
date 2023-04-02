export const querys = {
    getAllProducts: "EXECUTE sp_ListarProductos;",
    getProducById: "EXECUTE sp_BuscarProducto @IdProducto;",
    addNewProduct: "EXECUTE sp_AgregarProducto @NombreProducto,@IdCategoria,@Descripcion;",
    deleteProduct: "EXECUTE sp_EliminarProducto @IdProducto;",
    updateProduct: "sp_ModificarProducto @IdProducto, @NombreProducto, @IdCategoria, @Descripcion;",
 
    //--------------------------CATEGORIAS QUERY------------------------------

    addNewCategory: "EXECUTE sp_AgregarCategoria @Nombre;",
    readCategory:"EXECUTE sp_BuscarCategoria @IdCategoria;",
    readCategories:"EXECUTE sp_ListarCategorias;",
    updateCategory: "EXECUTE sp_ModificarCategoria @IdCategoria,@Nombre;",
    deleteCategory:"EXECUTE sp_EliminarCategoria @IdCategoria;"

};