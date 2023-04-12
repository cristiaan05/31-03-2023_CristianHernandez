import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap';
import { getInventariosBy } from "../providers/dashboardSlice";
import Tabla from "../components/Tabla";
import Boton from "../components/Boton";
import { useNavigate } from "react-router-dom";

const columnas = [
    { titulo: "Id", nombre: "IdInventario" },
    { titulo: "Producto", nombre: "NombreProducto" },
    { titulo: "Sucursal", nombre: "NombreSucursal" },
    { titulo: "Cantidad", nombre: "cantidad" },
    { titulo: "", nombre: "" },
    { titulo: "", nombre: "" },
];

function Dashboard() {
    const dispatch = useDispatch();
    const { inventarios } = useSelector(state => state.inventarios)
    //const navigate = useNavigate();
    function cargar() {
        dispatch(getInventariosBy());
    }
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/addInventario')
    }
    useEffect(() => {
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Container style={{ margin: '0 auto', paddingTop: '20px', padding: '50px' }}>
                <Boton contenido="Nuevo Inventario" color="primary" accion={redirect} />
                <Tabla columnas={columnas} data={inventarios} tipoTabla="inventarios" />
            </Container>
        </div>
    );
}

export default Dashboard;
