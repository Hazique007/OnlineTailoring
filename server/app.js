import express from "express";
import { database } from "./db/db.js";
import cors from "cors";
import path from "path";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import landingRouter from "./routes/landingRoutes.js";
import fabricRouter from "./routes/fabricRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";

database();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/landing", landingRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/fabric", fabricRouter);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
