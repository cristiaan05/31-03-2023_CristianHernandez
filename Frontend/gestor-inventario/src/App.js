import { Navigate, Route, Routes } from "react-router-dom";
import NavbarPrincipal from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Categorias from "./views/Categorias";
import ModalForm from "./components/Modal";
import Productos from "./views/Productos";
import Sucursales from "./views/Sucursales";

function App() {
  return (
    <>
      <NavbarPrincipal />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/addCategoria" element={<ModalForm titulo="Crear Categoria" content='categoria' />} />

        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/addProductos" element={<ModalForm titulo="Crear Producto" content='producto' />} />




        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/sucursales/addSucursal" element={<ModalForm titulo="Crear Sucursal" content='sucursal' />} />

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
