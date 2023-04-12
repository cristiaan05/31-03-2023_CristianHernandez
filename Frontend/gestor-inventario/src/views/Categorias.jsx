import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap';
import Tabla from "../components/Tabla";
import Boton from "../components/Boton";
import { getCategoriasAll } from "../providers/categoriasSlice";
import { useNavigate } from "react-router-dom";


const columnas = [
    { titulo: "Id", nombre: "IdCategoria" },
    { titulo: "Nombre", nombre: "Nombre" },
    { titulo: "", nombre: "" },
    { titulo: "", nombre: "" },
];

function Categorias() {
    const dispatch = useDispatch();
    const { categorias } = useSelector(state => state.categorias)
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/categorias/addCategoria')
    }

    function cargar() {
        dispatch(getCategoriasAll());
    }

    useEffect(() => {
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Container style={{ margin: '0 auto', paddingTop: '20px', padding: '50px' }}>
                <Boton contenido="Nueva " color="primary" accion={redirect}/>
                <Tabla columnas={columnas} data={categorias} tipoTabla="categorias"/>
            </Container>
        </div>
    );
}

export default Categorias;
