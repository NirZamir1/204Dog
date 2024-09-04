//configing the .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Score from "./Models/score.model.js";
import apiRouter from "./Routes/apiRoute.js";
import path from "path";
const app = express();
app.use(express.static(path.join(process.env.PATH_TO_INDEX, "dist")));
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected to MongoDB"))
  .catch("Failed to connect to MongoDB");

app.listen(3000, () => console.log("listening on port 3000"));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.env.PATH_TO_INDEX, "dist", "index.html"));
  console.log(path.join(process.env.PATH_TO_INDEX, "dist", "index.html"))
});
