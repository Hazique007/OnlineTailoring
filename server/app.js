import express from "express";
import { database } from "./db/db.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cluster from "cluster";
import os from "os";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import landingRouter from "./routes/landingRoutes.js";
import fabricRouter from "./routes/fabricRoutes.js";
import addressRoute from "./routes/AddressRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import personalDetailsRoute from "./routes/PersonalDetailsRoutes.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();
// const total_cpu = os.availableParallelism();
// console.log(total_cpu);

// if (cluster.isPrimary) {
//   for (let i = 0; i < total_cpu; i++) {
//     cluster.fork();
//   }
// } else {
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

database();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Open it again");
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/landing", landingRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/fabric", fabricRouter);
app.use(addressRoute);
app.use(personalDetailsRoute);
app.use("/orders", OrderRoute);
app.use("/api", UserRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
// }
