import { getConnection, sql } from "../database/connection.js";
import { querys } from "../database/query.js";

export async function getProducts(req, res) {
    const pool = await getConnection()
    const result = await pool.request().query(querys.getAllProducts);
    console.log(result.recordset)
    return res.status(200).send({ products: result.recordset });
}

export async function getProducById(req,res){
    const {idProducto}=req.body;
    try {
        const pool=await  getConnection();

        let product=await pool.request()
            .input("IdProducto",sql.Int,idProducto)
            .query(querys.getProducById);
        
        if (product.recordset.length!=0) {
            
            return res.status(200).send({
                message:"Successfull",
                product: product.recordset[0]
            })
        }else{
            return res.status(403).send({
                message:"No se encontro ningun producto"
            })
        }
    } catch (error) {
        return res.status(400).send({
            message:"Error getting the product",
            error:error
        })
    }
}

export async function addProduct(req, res) {
    const { nombreProducto, idCategoria, descripcion } = req.body;
    if(nombreProducto==null || idCategoria==null){
        return res.status(400).send({
            message:"Data is missing",
            successfull:false
        })
    }
    try {
        const pool = await getConnection()
        //verificamos si exista la categoria
        const existeCategoria = await pool.request()
            .input("IdCategoria", sql.Int, idCategoria)
            .query(querys.readCategory);
        if (existeCategoria.recordset.length == 0) {
            return res.status(400).send({
                message: "La categoria no existe",
                successfull:false
            });
        } else {
            try {
                let nuevoProducto = await pool.request()
                    .input("NombreProducto", sql.VarChar, nombreProducto)
                    .input("Descripcion", sql.VarChar, descripcion)
                    .input("IdCategoria", sql.Int, idCategoria)
                    .query(querys.addNewProduct);

                return res.status(200).send({
                    message: "Producto Añadido exitosamente",
                    producto: [nombreProducto, idCategoria, descripcion],
                    successfull:true
                })
            } catch (error) {
                return res.status(400).send({
                    error: error,
                    successfull:false
                })
            }

        }
    }
    catch (error) {
        return res.status(400).send({
            message: "error en la peticion",
            error: error
        })
    }

}

export async function updateProduct(req, res) {
    const { nombreProducto, idCategoria, descripcion, idProducto } = req.body;
    // const { idProducto } = req.params.id;


    try {
        const pool = await getConnection();
        let updatedProduct = await pool.request()
            .input("IdProducto", sql.Int, idProducto)
            .input("NombreProducto", sql.VarChar, nombreProducto)
            .input("IdCategoria", sql.Int, idCategoria)
            .input("Descripcion", sql.VarChar, descripcion)
            .query(querys.updateProduct);
        if (updatedProduct.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Updated successfuly",
                product: { idProducto, nombreProducto, idCategoria, descripcion }
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

export async function deleteProduct(req, res) {
    const { idProducto } = req.body

    try {
        const pool = await getConnection();
        let productDeleted = await pool.request()
            .input("IdProducto", sql.Int, idProducto)
            .query(querys.deleteProduct);

        if (productDeleted.rowsAffected.length != 0) {
            return res.status(200).send({
                message: "Deleted successfuly",
                product: { idProducto }
            })
        } else {
            return res.status(400).send({
                message: "Hubo un error"
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: "Error deleting the product"
        })
    }
}