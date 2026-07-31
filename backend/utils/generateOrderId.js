let counter = 1;
export const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const orderId = `ORD-${year}${month}${day}-${String(counter).padStart(4, "0")}`;
  counter++;
  return orderId;
};