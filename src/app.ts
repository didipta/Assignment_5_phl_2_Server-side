import express, { Application } from "express";
import cors from "cors";
import router from "./router";
const app: Application = express();

// using cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

export default app;
