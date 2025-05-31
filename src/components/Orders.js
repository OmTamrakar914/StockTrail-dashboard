import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders")
      .then((res) => {
        console.log("Fetched Orders:", res.data); // Debugging: Check if data is received
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length > 0 ? (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                {/* <th>Time</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name || "N/A"}</td>
                  <td>{order.qty || 0}</td>
                  <td>{order.price ? order.price.toFixed(2) : "N/A"}</td>
                  <td className={order.status ? order.status.toLowerCase() : "unknown"}>
                    {order.mode || "Unknown"}
                  </td>
                  {/* <td>{order.orderType || "N/A"}</td> */}
                  {/* <td>{order.time ? new Date(order.time).toLocaleTimeString() : "N/A"}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
