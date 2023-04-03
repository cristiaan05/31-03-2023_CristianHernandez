export const querys = {
    //----------------------PRODUCTOS QUERY--------------------------------
    getAllProducts: "EXECUTE sp_ListarProductos;",
    getProducById: "EXECUTE sp_BuscarProducto @IdProducto;",
    addNewProduct: "EXECUTE sp_AgregarProducto @NombreProducto,@IdCategoria,@Descripcion;",
    deleteProduct: "EXECUTE sp_EliminarProducto @IdProducto;",
    updateProduct: "sp_ModificarProducto @IdProducto, @NombreProducto, @IdCategoria, @Descripcion;",

    //--------------------------CATEGORIAS QUERY------------------------------

    addNewCategory: "EXECUTE sp_AgregarCategoria @Nombre;",
    readCategory: "EXECUTE sp_BuscarCategoria @IdCategoria;",
    readCategories: "EXECUTE sp_ListarCategorias;",
    updateCategory: "EXECUTE sp_ModificarCategoria @IdCategoria,@Nombre;",
    deleteCategory: "EXECUTE sp_EliminarCategoria @IdCategoria;",

    //----------------------------SUCURSALES QUERY----------------------------

    addSucursal: "EXECUTE spAgregarSucursal @NombreSucursal,@Direccion,@Correo,@Departamento , @Municipio, @Telefono;",
    updateSucursal: "EXECUTE sp_ModificarSucursal @IdSucursal,@NombreSucursal,@Direccion,@Correo,@Departamento , @Municipio, @Telefono;",
    deleteSucursal: "EXECUTE sp_EliminarSucursal @IdSucursal;",
    readSucursales: "EXECUTE sp_ListarSucursales;",
    readSucursal: "EXECUTE sp_BuscarSucursal @IdSucursal;",

    //----------------------------INVENTARIO QUERY----------------------------

    addNewInventario: "EXECUTE spAgregarInventario @IdProducto,@IdSucursal,@Cantidad;",
    updateInventario: "EXECUTE sp_ModificarInventario @IdInventario,@IdProducto,@IdSucursal,@Cantidad;",
    deleteInventario: "EXECUTE sp_EliminarInventario @IdInventario;",
    readInventarios: "EXECUTE sp_ListarInventarios;",
    readInventario: "EXECUTE sp_BuscarInventario @IdInventario;"
};

