import { Router } from "express";
import { addProduct, deleteProduct, getProducById, getProducts, updateProduct } from "../controllers/products.controller.js";
const router=Router();

router.post('/addProduct',addProduct);
router.get('/getProducts',getProducts);
router.get('/getProduct',getProducById);
router.put('/updateProduct',updateProduct);
router.delete('/deleteProduct',deleteProduct)
export default router;