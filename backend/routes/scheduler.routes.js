import express from "express";
import { runScheduler } from "../controllers/scheduler.controller.js";
import { verifyScheduler } from "../middleware/verifyScheduler.js";
const router = express.Router();
router.post("/run", verifyScheduler, runScheduler);
export default router;