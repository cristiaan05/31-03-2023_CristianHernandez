import { getConnection, sql } from "../database/connection.js";
import { querys } from "../database/query.js";

export async function addCategory(req,res) {
    const {nombre}=req.body;

    if (nombre == null) {
        return res.status(400).send({ msg: "Bad Request. Please fill all fields" });
      }

    const pool = await getConnection()
    const result = await pool.request()
        .input("Nombre", sql.VarChar, nombre)
        .query(querys.addNewCategory);

    return res.status(200).send({"categoria creada":nombre});
}

export async function deleteCategory(req,res){
    const {idCategoria}=req.body;

    try {
        const pool=await getConnection();
        let categoryDeleted = await pool.request()
            .input("IdCategoria", sql.Int, idCategoria)
            .query(querys.deleteCategory);

        if (categoryDeleted.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Deleted successfuly",
                category: { idCategoria }
            })
        } else {
            return res.status(400).send({
                message: "Hubo un error borrando la categoria"
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "Error en la peticion"
        })
    }
}

export async function updateCategory(req, res) {
    const { nombreCategoria, idCategoria } = req.body;
    // const { idProducto } = req.params.id;

    try {
        const pool = await getConnection();
        let updatedCategory = await pool.request()
            .input("IdCategoria", sql.Int, idCategoria)
            .input("Nombre", sql.VarChar, nombreCategoria)
            .query(querys.updateCategory);
        if (updatedCategory.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Updated successfuly",
                product: { idCategoria, nombreCategoria }
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

export async function getCategories(req, res) {
    const pool = await getConnection()

    try {
        const result = await pool.request().query(querys.readCategories);
        return res.status(200).send({ categories: result.recordset });
    } catch (error) {
        return res.status(400).send({
            error:error
        })
    }

}

export async function getCategoryById(req,res){
    const {idCategoria}=req.body;
    try {
        const pool=await  getConnection();

        let category=await pool.request()
            .input("IdCategoria",sql.Int,idCategoria)
            .query(querys.readCategory);
        
        // if (category.recordset.length!=0) {
            
            return res.status(200).send({
                message:"Successfull",
                product: category.recordset
            })
        // }else{
        //     return res.status(403).send({
        //         message:"No se encontro ningun producto"
        //     })
        // }
    } catch (error) {
        return res.status(400).send({
            message:"Error getting the product",
            error:error
        })
    }
}