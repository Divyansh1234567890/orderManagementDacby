import Order from "../models/order.model.js";
import OrderStatusHistory from "../models/orderStatusHistory.model.js";
import { generateOrderId } from "../utils/generateOrderId.js";

export const createOrderService = async (data) => {
  const order = await Order.create({
    orderId: generateOrderId(),
    customerName: data.customerName,
    phoneNumber: data.phoneNumber,
    productName: data.productName,
    amount: data.amount,
    paymentStatus: data.paymentStatus || "PENDING",
  });

  await OrderStatusHistory.create({
    order: order._id,
    oldStatus: "PLACED",
    newStatus: "PLACED",
    changedBy: "USER",
  });

  return order;
};

export const getOrdersService = async (status) => {
  const filter = {};

  if (status) {
    filter.orderStatus = status;
  }

  return await Order.find(filter).sort({ createdAt: -1 });
};

export const updateOrderStatusService = async (
  orderId,
  newStatus,
  changedBy = "USER"
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const oldStatus = order.orderStatus;

  order.orderStatus = newStatus;

  await order.save();

  await OrderStatusHistory.create({
    order: order._id,
    oldStatus,
    newStatus,
    changedBy,
  });

  return order;
};