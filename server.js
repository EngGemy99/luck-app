//? third party lib
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
//?Custom File
import { dbConnection } from "./DB/dbConnection.js";
import { allRoutes } from "./src/Modules/index.routes.js";
import axios from "axios";
import cron from "node-cron";
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

//* to request server every 10 min to prevent sleep issues
cron.schedule("*/10 * * * *", async () => {
  await axios.get("https://luke-app2.onrender.com/admin");
});
