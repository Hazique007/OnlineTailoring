import express from "express";
import { database } from "./db/db.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import landingRouter from "./routes/landingRoutes.js";
import fabricRouter from "./routes/fabricRoutes.js";
import addressRoute from "./routes/AddressRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import personalDetailsRoute from "./routes/PersonalDetailsRoutes.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// For ES module `__dirname` and `__filename`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Increase the limit for JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
database();

// Middleware
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Open it again");
});

// API routes
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
