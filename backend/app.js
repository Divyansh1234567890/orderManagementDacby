import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import orderRoutes from "./routes/order.routes.js";
import schedulerRoutes from "./routes/scheduler.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/orders", orderRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Order management system"
    });
});

export default app;