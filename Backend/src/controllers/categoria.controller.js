import { sql } from "../database/connection.js";
import { querys } from "../database/query.js";
import { dbfun } from "../index.js";

export async function addCategory(req, res) {
    const { nombre } = req.body;

    if (nombre == null) {
        return res.status(400).send({
            message: "Bad Request. Please fill all fields",
            successfull: false
        });
    }
    try {
        const pool = await dbfun();
        const result = await pool.request()
            .input("Nombre", sql.VarChar, nombre)
            .query(querys.addNewCategory);

        return res.status(200).send({
            message: "Created Successfull",
            categoria: nombre,
            successfull: true
        });
    } catch (error) {
        return res.status(400).send({
            message: "error",
            error: error
        })
    }

}

export async function deleteCategory(req, res) {
    const { idCategoria } = req.body;

    try {
        const pool = await dbfun();
        //VERIFICAMOS SI EXISTE LA CATEGORIA QUE DESEA ELIMINAR
        let existeCategoria = await pool.request()
            .input("IdCategoria", sql.Int, idCategoria)
            .query(querys.readCategory);
        //SI LA CONSULTA GET TRAE UNA CATEGORIA PROCEDEMOS A ELIMINAR
        if (existeCategoria.recordset.length > 0) {
            let categoryDeleted = await pool.request()
                .input("IdCategoria", sql.Int, idCategoria)
                .query(querys.deleteCategory);

            if (categoryDeleted.rowsAffected[0] != 0) {
                return res.status(200).send({
                    message: "Deleted successfuly",
                    category: { idCategoria },
                    successfull: true
                })
            } else {
                return res.status(400).send({
                    message: "Hubo un error borrando la categoria",
                    successfull: false
                })
            }
        } else {
            return res.status(400).send({
                message: "No existe la categoria",
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

export async function updateCategory(req, res) {
    const { nombreCategoria, idCategoria } = req.body;
    // const { idProducto } = req.params.id;

    if (nombreCategoria == null || idCategoria == null) {
        return res.status(400).send({
            message: "Missing Nombre Categoria o Id",
            successfull: false
        })
    }

    try {
        const pool = await dbfun();
        //VERIFICAMOS SI EXISTE LA CATEGORIA QUE DESEA ELIMINAR
        let existeCategoria = await pool.request()
            .input("IdCategoria", sql.Int, idCategoria)
            .query(querys.readCategory);
        //SI LA CONSULTA GET TRAE UNA CATEGORIA PROCEDEMOS A ELIMINAR
        if (existeCategoria.recordset.length > 0) {
            let updatedCategory = await pool.request()
                .input("IdCategoria", sql.Int, idCategoria)
                .input("Nombre", sql.VarChar, nombreCategoria)
                .query(querys.updateCategory);
            if (updatedCategory.rowsAffected.length != 0) {
                return res.status(200).send({
                    message: "Updated successfuly",
                    product: { idCategoria, nombreCategoria },
                    successfull: true
                })
            } else {
                return res.status(400).send({
                    message: "error", error
                })
            }
        } else {
            return res.status(400).send({
                message: "No existe la categoria",
                successfull: false
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "error en la operacion", error
        })
    }
}

export async function getCategories(req, res) {
    const pool = await dbfun()

    try {
        const result = await pool.request().query(querys.readCategories);
        return res.status(200).send({ categorias: result.recordset });
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }

}

export async function getCategoryById(req, res) {
    const { idCategoria } = req.body;
    try {
        const pool = await dbfun();

        let category = await pool.request()
            .input("IdCategoria", sql.Int, idCategoria)
            .query(querys.readCategory);

        // if (category.recordset.length!=0) {

        return res.status(200).send({
            message: "Successfull",
            product: category.recordset
        })
        // }else{
        //     return res.status(403).send({
        //         message:"No se encontro ningun producto"
        //     })
        // }
    } catch (error) {
        return res.status(400).send({
            message: "Error getting the product",
            error: error
        })
    }
}