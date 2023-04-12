import { Navigate, Route, Routes } from "react-router-dom";
import NavbarPrincipal from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Categorias from "./views/Categorias";
import ModalForm from "./components/Modal";
import Productos from "./views/Productos";
import Sucursales from "./views/Sucursales";
import ModalEditar from "./components/ModalEditar";
import ConfirmDeleteModal from "./components/Eliminar";

function App() {
  return (
    <>
      <NavbarPrincipal />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addInventario" element={<ModalForm titulo="Crear Inventario" content='inventario' />} />
        <Route path="/editarInventario" element={<ModalEditar titulo="Editar Inventario" content='inventario' />} />
        <Route path="/eliminarInventario" element={<ConfirmDeleteModal tipo='inventario' />} />

        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/addCategoria" element={<ModalForm titulo="Crear Categoria" content='categoria' />} />
        <Route path="/categorias/editarCategoria" element={<ModalEditar titulo="Editar Categoria" content='categoria' />} />
        <Route path="/categorias/eliminarCategoria" element={<ConfirmDeleteModal tipo='categoria' />} />

        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/addProductos" element={<ModalForm titulo="Crear Producto" content='producto' />} />
        <Route path="/productos/editarProducto" element={<ModalEditar titulo="Editar Producto" content='producto' />} />
        <Route path="/productos/eliminarProducto" element={<ConfirmDeleteModal tipo='producto' />} />


        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/sucursales/addSucursal" element={<ModalForm titulo="Crear Sucursal" content='sucursal' />} />
        <Route path="/sucursales/editarSucursal" element={<ModalEditar titulo="Editar Sucursal" content='sucursal' />} />
        <Route path="/sucursales/eliminarSucursal" element={<ConfirmDeleteModal tipo='sucursal' />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
