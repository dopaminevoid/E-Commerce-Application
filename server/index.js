import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
const port = 3000;
app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/api", apiRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
