import Order from "../models/order.model.js";
import OrderStatusHistory from "../models/orderStatusHistory.model.js";
import SchedulerLog from "../models/schedulerLog.model.js";

export const runSchedulerService = async () => {
  const startedAt = new Date();
  let checked = 0;
  let updated = 0;
  try {
    const now = new Date();
    const placedOrders = await Order.find({
      orderStatus: "PLACED",
    });
    checked += placedOrders.length;
    for (const order of placedOrders) {
      const diff =
        (now.getTime() - order.createdAt.getTime()) / (1000 * 60);

      if (diff >= 10) {
        const oldStatus = order.orderStatus;
        order.orderStatus = "PROCESSING";
        await order.save();
        await OrderStatusHistory.create({
          order: order._id,
          oldStatus,
          newStatus: "PROCESSING",
          changedBy: "SCHEDULER",
        });
        updated++;
      }
    }
    const processingOrders = await Order.find({
      orderStatus: "PROCESSING",
    });
    checked += processingOrders.length;
    for (const order of processingOrders) {
      const diff =
        (now.getTime() - order.updatedAt.getTime()) / (1000 * 60);
      if (diff >= 20) {
        const oldStatus = order.orderStatus;
        order.orderStatus = "READY_TO_SHIP";
        await order.save();
        await OrderStatusHistory.create({
          order: order._id,
          oldStatus,
          newStatus: "READY_TO_SHIP",
          changedBy: "SCHEDULER",
        });
        updated++;
      }
    }
    await SchedulerLog.create({
      startedAt,
      finishedAt: new Date(),
      totalOrdersChecked: checked,
      totalOrdersUpdated: updated,
      status: "SUCCESS",
    });

    return {
      checked,
      updated,
    };
  } catch (error) {
    await SchedulerLog.create({
      startedAt,
      finishedAt: new Date(),
      totalOrdersChecked: checked,
      totalOrdersUpdated: updated,
      status: "FAILED",
      error: error.message,
    });

    throw error;
  }
};