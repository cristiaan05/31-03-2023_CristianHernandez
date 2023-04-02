import { getConnection, sql } from "../database/connection.js";
import { querys } from "../database/query.js";

export async function addSucursal(req, res) {
    const { nombreSucursal, direccion, correo, departamento, municipio, telefono } = req.body;
    if (nombreSucursal == null || direccion == null || departamento == null || municipio == null) {
        return res.status(400).send({
            message: "Data is missing",
            successfull: false
        })
    }
    try {
        const pool = await getConnection()
        //verificamos si exista la categoria
        let nuevaSucursal = await pool.request()
            .input("NombreSucursal", sql.VarChar, nombreSucursal)
            .input("Direccion", sql.VarChar, direccion)
            .input("Correo", sql.VarChar, correo)
            .input("Departamento", sql.VarChar, departamento)
            .input("Municipio", sql.VarChar, municipio)
            .input("Telefono", sql.VarChar, telefono)
            .query(querys.addSucursal);

        return res.status(200).send({
            message: "Sucursal Añadida exitosamente",
            sucursal: { nombreSucursal, direccion, correo, departamento, municipio, telefono },
            successfull: true
        })
    } catch (error) {
        return res.status(400).send({
            error: error,
            successfull: false
        })
    }

}

export async function updateSucursal(req, res) {
    const { idSucursal, nombreSucursal, direccion, correo, departamento, municipio, telefono } = req.body;
    // const { idProducto } = req.params.id;

    if (idSucursal == null, nombreSucursal == null || direccion == null || departamento == null || municipio == null) {
        return res.status(400).send({
            message: "Data is missing",
            successfull: false
        })
    }

    try {
        const pool = await getConnection();
        let updateSucursal = await pool.request()
            .input("NombreSucursal", sql.VarChar, nombreSucursal)
            .input("Direccion", sql.VarChar, direccion)
            .input("Correo", sql.VarChar, correo)
            .input("Departamento", sql.VarChar, departamento)
            .input("Municipio", sql.VarChar, municipio)
            .input("Telefono", sql.VarChar, telefono)
            .query(querys.updateSucursal);
        if (updateSucursal.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Updated successfuly",
                product: { idSucursal, nombreSucursal, direccion, correo, departamento, municipio, telefono },
                successfull: true
            })
        } else {
            return res.status(400).send({
                message: "error", error
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "error en la operacion", error
        })
    }
}

export async function deleteSucursal(req, res) {
    const { idSucursal } = req.body;

    try {
        const pool = await getConnection();
        let sucursalDeleted = await pool.request()
            .input("IdSucursal", sql.Int, idSucursal)
            .query(querys.deleteSucursal);

        if (sucursalDeleted.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Deleted successfuly",
                category: { idSucursal },
                successfull: true
            })
        } else {
            return res.status(400).send({
                message: "Hubo un error borrando la sucursal",
                successfull: false
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "Error en la peticion",
            successfull: false
        })
    }
}

export async function getSucursales(req, res) {
    const pool = await getConnection()

    try {
        const result = await pool.request().query(querys.readSucursales);
        return res.status(200).send({ sucursales: result.recordset });
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }

}

export async function getSucursalById(req, res) {
    const { idSucursal } = req.body;
    try {
        const pool = await getConnection();

        let sucursal = await pool.request()
            .input("IdSucursal", sql.Int, idSucursal)
            .query(querys.readCategory);

        return res.status(200).send({
            message: "Successfull",
            product: sucursal.recordset
        })
    } catch (error) {
        return res.status(400).send({
            message: "Error getting the sucursal",
            error: error
        })
    }
}