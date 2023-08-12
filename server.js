//? third party lib
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
//?Custom File
import { dbConnection } from "./DB/dbConnection.js";
import { allRoutes } from "./src/Modules/index.routes.js";

const app = express();
dotenv.config();
dbConnection(app);

app.use(morgan("dev"));
//?express middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

//? all route
allRoutes(app);
