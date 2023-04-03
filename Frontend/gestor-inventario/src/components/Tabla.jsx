import React from "react";

import { Table } from "react-bootstrap";

function Tabla({ columnas, data }) {
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
                                <td key={index}>{fila[columna.nombre]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}


export default Tabla;
