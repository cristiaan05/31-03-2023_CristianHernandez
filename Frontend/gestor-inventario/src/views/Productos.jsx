import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap';
import Tabla from "../components/Tabla";
import Boton from "../components/Boton";

import { useNavigate } from "react-router-dom";
import { getProductosAll } from "../providers/productosSlice";


const columnas = [
    { titulo: "Id", nombre: "IdProducto" },
    { titulo: "Nombre", nombre: "NombreProducto" },
    { titulo: "Categoria", nombre: "Nombre" },
    { titulo: "Descripcion", nombre: "Descripcion" },
];

function Productos() {
    const dispatch = useDispatch();
    const { productos } = useSelector(state => state.productos)
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/productos/addProductos')
    }

    function cargar() {
        dispatch(getProductosAll());
    }

    useEffect(() => {
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Container style={{ margin: '0 auto', paddingTop: '20px', padding: '50px' }}>
                <Boton contenido="Eliminar " color="danger" />
                <Boton contenido="Editar " color="secondary" />
                <Boton contenido="Nueva " color="primary" accion={redirect}/>
                <Tabla columnas={columnas} data={productos} />
            </Container>
        </div>
    );
}

export default Productos;
