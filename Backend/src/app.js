import express from "express";
import cors from "cors";
import config from "./config.js";
import morgan from "morgan";
import productRoutes from "./routes/products.routes.js";
import routerCategory from "./routes/category.routes.js";



const app = express();


app.set("port", config.port);


app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(productRoutes,routerCategory)

export default app;