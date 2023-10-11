import express from "express";
import route from "./routes/routes.js";
import { startserver } from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let PORT = process.env.PORT;
let URL = process.env.DATABASE;

startserver(app, PORT, URL);

app.use("/", route);