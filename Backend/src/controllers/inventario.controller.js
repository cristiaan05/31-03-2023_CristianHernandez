import { sql } from "../database/connection.js";
import { querys } from "../database/query.js";
import { dbfun } from "../index.js";

export async function addInventario(req, res) {
    const { idProducto, idSucursal, cantidad } = req.body;
    if (idProducto == null || idSucursal == null || cantidad == null) {
        return res.status(400).send({
            message: "Data is missing",
            successfull: false
        })
    }
    try {
        const pool = await dbfun();
        //consultamos si hay un producto con el id
        let existeProducto = await pool.request()
            .input("IdProducto", sql.Int, idProducto)
            .query(querys.getProducById);
        //consultamos si hay una sucursal con el id
        let existeSucursal = await pool.request()
            .input("IdSucursal", sql.Int, idSucursal)
            .query(querys.readSucursal)
        console.log(existeProducto.rowsAffected[0])
        console.log(existeSucursal.rowsAffected[0])
        if (existeProducto.rowsAffected[0] == 1 && existeSucursal.rowsAffected[0] == 1) {
            let nuevoInventario = await pool.request()
                .input("IdProducto", sql.Int, idProducto)
                .input("IdSucursal", sql.Int, idSucursal)
                .input("cantidad", sql.Int, cantidad)
                .query(querys.addNewInventario);
            if (nuevoInventario.rowsAffected[0]==1) {
                return res.status(200).send({
                    message: "Inventario Añadida exitosamente",
                    sucursal: { idProducto, idSucursal, cantidad },
                    successfull: true
                })
            }else{
                return res.status(400).send({
                    message: "El inventariono se pudo crear",
                    successfull: false
                })
            }

        } else {
            return res.status(400).send({
                message: "El producto o la sucursal no existen",
                successfull: false
            })
        }


    } catch (error) {
        return res.status(400).send({
            error: error,
            successfull: false
        })
    }

}

export async function updateInventario(req, res) {
    const { idInventario, idProducto, idSucursal, cantidad } = req.body;
    // const { idProducto } = req.params.id;

    if (idInventario == null, idProducto == null || idSucursal == null || cantidad == null) {
        return res.status(400).send({
            message: "Data is missing",
            successfull: false
        })
    }

    try {
        const pool = await dbfun();
        let updateInventario = await pool.request()
            .input("IdInventario", sql.Int, idInventario)
            .input("IdProducto", sql.Int, idProducto)
            .input("idSucursal", sql.Int, idSucursal)
            .input("cantidad", sql.Int, cantidad)
            .query(querys.updateInventario);
        if (updateInventario.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Updated successfuly",
                product: { idInventario, idProducto, idSucursal, cantidad },
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

export async function deleteInventario(req, res) {
    const { idInventario } = req.body;

    try {
        const pool = await dbfun();
        let inventarioDeleted = await pool.request()
            .input("IdInventario", sql.Int, idInventario)
            .query(querys.deleteInventario);

        if (inventarioDeleted.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Deleted successfuly",
                inventario: { idInventario },
                successfull: true
            })
        } else {
            return res.status(400).send({
                message: "Hubo un error borrando el inventario",
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

export async function getInventarios(req, res) {
    const pool = await dbfun()

    try {
        const result = await pool.request().query(querys.readInventarios);
        return res.status(200).send({ 
            inventarios: result.recordset,
            successfull: true
        });
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }

}
