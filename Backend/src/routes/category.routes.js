import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoria.controller.js";

const routerCategory=Router();

routerCategory.post('/addCategory',addCategory);
routerCategory.delete('/deleteCategory',deleteCategory);
routerCategory.put('/updateCategory',updateCategory);
routerCategory.get('/getCategories',getCategories);
routerCategory.get('/getCategory',getCategoryById);
export default routerCategory;