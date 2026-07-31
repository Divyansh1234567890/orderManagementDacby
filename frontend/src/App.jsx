import { useEffect, useState } from "react";
import OrdersTable from "../components/OrdersTable";
import { getOrders } from "../services/orderApi";
import "./App.css";
function App() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders(status);

      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: 20 }}>
      <div className="container">
        <h1>Order Dashboard</h1>
        <p className="subtitle">Manage customer orders in real time</p>
      </div>
      <div className="topbar">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Orders</option>
          <option value="PLACED">PLACED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="READY_TO_SHIP">READY_TO_SHIP</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button onClick={fetchOrders}>🔄 Refresh Orders</button>
      </div>

      <br />
      <br />

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}

export default App;
