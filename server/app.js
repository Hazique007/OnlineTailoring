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
import ClickRouter from "./routes/clickRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ credentials: true, methods: ["GET", "POST", "PUT", "DELETE"] }));

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "build")));

// Database connection
database();

// API Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/landing", landingRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/fabric", fabricRouter);
app.use("/api/v1/stats", ClickRouter);

app.use(addressRoute);
app.use(personalDetailsRoute);
app.use("/orders", OrderRoute);
app.use("/api", UserRoute);

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
