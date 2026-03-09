import React, { useEffect, useState } from "react";
import { getEmployeeOrders, updateOrderStatus } from "../../services/api.js";
import { ORDER_STATUSES } from "../../constants/orderStatus.js";
import "./EmployeeOrdersPage.css";

function formatPrice(num) {
  return (num || 0).toLocaleString("vi-VN") + "đ";
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EmployeeOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployeeOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updated : o))
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="employee-orders">
        <h1 className="employee-orders__title">Orders</h1>
        <p className="employee-orders__loading">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-orders">
        <h1 className="employee-orders__title">Orders</h1>
        <p className="employee-orders__error">{error}</p>
        <button type="button" className="employee-orders__retry" onClick={loadOrders}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="employee-orders">
      <h1 className="employee-orders__title">Orders</h1>
      <p className="employee-orders__count">{orders.length} order(s)</p>

      {orders.length === 0 ? (
        <p className="employee-orders__empty">No orders yet.</p>
      ) : (
        <div className="employee-orders__table-wrap">
          <table className="employee-orders__table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="employee-orders__date">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="employee-orders__id">
                    <code>{String(order._id).slice(-8)}</code>
                  </td>
                  <td>
                    <div className="employee-orders__customer">
                      <strong>{order.fullName}</strong>
                      <span>{order.phone}</span>
                      <span>{order.address}, {order.city}</span>
                    </div>
                  </td>
                  <td>
                    <ul className="employee-orders__items">
                      {order.items?.map((item, i) => (
                        <li key={i}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="employee-orders__total">
                    {formatPrice(order.total)}
                  </td>
                  <td>
                    <select
                      className="employee-orders__select"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={updatingId === order._id}
                    >
                      {ORDER_STATUSES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {updatingId === order._id && (
                      <span className="employee-orders__saving">Saving...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeOrdersPage;
