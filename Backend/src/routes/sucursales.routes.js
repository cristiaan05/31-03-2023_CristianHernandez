import { Router } from "express";
import { addSucursal, deleteSucursal, getSucursalById, getSucursales, updateSucursal } from "../controllers/sucursales.controller.js";


const routerSucursal=Router();

routerSucursal.post('/addSucursal',addSucursal);
routerSucursal.put('/updateSucursal',updateSucursal);
routerSucursal.delete('/deleteSucursal',deleteSucursal);
routerSucursal.get('/getSucursales',getSucursales);
routerSucursal.get('/getSucursal',getSucursalById);
export default routerSucursal;