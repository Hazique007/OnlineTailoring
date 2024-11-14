import express from "express";
import { database } from "./db/db.js";
import cors from "cors";
import productRouter from "./routes/productRoutes.js";
const app = express();
database();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1/products", productRouter);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
