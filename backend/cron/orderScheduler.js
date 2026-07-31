import cron from "node-cron";
import { runSchedulerService } from "../services/scheduler.service.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("Running Order Scheduler");

  try {
    await runSchedulerService();
    console.log("Scheduler completed.");
  } catch (err) {
    console.log(err.message);
  }
});