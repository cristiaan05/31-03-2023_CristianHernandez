import { Router } from "express";
import { addInventario, deleteInventario, getInventarios, updateInventario } from "../controllers/inventario.controller.js";

const routerInventario=Router();

routerInventario.post('/addInventario',addInventario);
routerInventario.put('/updateInventari',updateInventario);
routerInventario.delete('/deleteInventario',deleteInventario)
routerInventario.get('/getInventarios',getInventarios);
export default routerInventario;