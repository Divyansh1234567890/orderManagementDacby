export default function OrdersTable({ orders }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.orderId}</td>
            <td>{order.customerName}</td>
            <td>{order.phoneNumber}</td>
            <td>{order.productName}</td>
            <td>₹{order.amount}</td>
            <td>{order.paymentStatus}</td>
            <td>{order.orderStatus}</td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}