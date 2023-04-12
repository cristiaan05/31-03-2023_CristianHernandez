import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap';
import Tabla from "../components/Tabla";
import Boton from "../components/Boton";

import { useNavigate } from "react-router-dom";
import { getSucursalesAll } from "../providers/sucursalSlice";


const columnas = [
    { titulo: "Id", nombre: "IdSucursal" },
    { titulo: "Nombre", nombre: "NombreSucursal" },
    { titulo: "Direccion", nombre: "Direccion" },
    { titulo: "Correo", nombre: "Correo" },
    { titulo: "Departamento", nombre: "Departamento" },
    { titulo: "Municipio", nombre: "Municipio" },
    { titulo: "Telefono", nombre: "Telefono" },
    { titulo: "Editar", nombre: "" },
    { titulo: "Eliminar", nombre: "" },
];

function Sucursales() {
    const dispatch = useDispatch();
    const { sucursales } = useSelector(state => state.sucursales)
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/sucursales/addSucursal')
    }

    function cargar() {
        dispatch(getSucursalesAll());
    }

    useEffect(() => {
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Container style={{ margin: '0 auto', paddingTop: '20px', padding: '50px' }}>
                <Boton contenido="Nueva " color="primary" accion={redirect}/>
                <Tabla columnas={columnas} data={sucursales} tipoTabla="sucursales"/>
            </Container>
        </div>
    );
}

export default Sucursales;
