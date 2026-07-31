import { runSchedulerService } from "../services/scheduler.service.js";
export const runScheduler = async (req, res) => {
  try {
    const result = await runSchedulerService();
    res.json({
      success: true,
      message: "Scheduler executed successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};