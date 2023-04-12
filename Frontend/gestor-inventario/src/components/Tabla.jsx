import React from "react";

import { Table } from "react-bootstrap";
import Boton from "./Boton";
import { useNavigate } from "react-router-dom";



function Tabla({ columnas, data, tipoTabla }) {
    const accionesPorTipoTabla = {
        sucursales: (data) => {
            redirectEditar("sucursal", data)
            console.log(data.IdSucursal)
        },
        categorias: (data) => {
            redirectEditar("categoria", data)
            console.log(data.IdCategoria)
        },
        productos: (data) => redirectEditar("producto", data),
        inventarios: (data) => {
            redirectEditar("inventario", data)
        },
        //productos: (id) => accionTabla3(id, otroParametro),
        // Agrega más tipos de tabla y sus acciones correspondientes aquí
    };
    const accionesPorTipoTablaEliminar = {
        sucursales: (data) => redirectEliminar("sucursal", data),
        categorias: (data) => redirectEliminar("categoria", data),
        productos: (data) => redirectEliminar("producto", data),
        inventarios: (data) => redirectEliminar("inventario", data),
        //productos: (id) => accionTabla3(id, otroParametro),
        // Agrega más tipos de tabla y sus acciones correspondientes aquí
    };
    const navigate = useNavigate();
    function redirectEditar(content, data) {
        switch (content) {
            case 'sucursal':
                navigate('/sucursales/editarSucursal', { state: { id: data } });
                return
            case 'producto':
                navigate('/productos/editarProducto', { state: { id: data } });
                return
            case 'categoria':
                navigate('/categorias/editarCategoria', { state: { id: data } });
                return
            case 'inventario':
                navigate('/editarInventario', { state: { id: data } });
                return
            default:
                return null;
        }
    }
    function redirectEliminar(content, data) {
        switch (content) {
            case 'sucursal':
                navigate('/sucursales/eliminarSucursal', { state: { id: data.IdSucursal } });
                return
            case 'producto':
                navigate('/productos/eliminarProducto', { state: { id: data.IdProducto } });
                return
            case 'categoria':
                navigate('/categorias/eliminarCategoria', { state: { id: data.IdCategoria } });
                return
            case 'inventario':
                navigate('/eliminarInventario', { state: { id: data.IdInventario } });
                return
            default:
                return null;
        }
    }
    return (
        <div className="dashboard-table">
            <Table striped bordered hover variant="dark" className="me-lg-3">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            <th key={index}>{columna.titulo}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((fila, index) => (
                        <tr key={index}>

                            {columnas.map((columna, index) => (

                                <td key={index}>
                                    {index === columnas.length - 2 ?
                                        // Hacer algo diferente en la última iteración
                                        <Boton contenido="Editar" color="secondary" accion={() => accionesPorTipoTabla[tipoTabla](fila)} />
                                        :
                                        // Hacer lo normal en las demás iteraciones
                                        fila[columna.nombre]
                                    }
                                    {index === columnas.length - 1 ?
                                        <Boton contenido="Eliminar" color="danger" accion={() => accionesPorTipoTablaEliminar[tipoTabla](fila)} />
                                        :
                                        // Hacer lo normal en las demás iteraciones
                                        <div></div>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}




export default Tabla;
