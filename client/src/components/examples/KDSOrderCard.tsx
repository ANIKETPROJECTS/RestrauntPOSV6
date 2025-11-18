import { useState } from "react";
import KDSOrderCard from "../KDSOrderCard";

export default function KDSOrderCardExample() {
  const [orders, setOrders] = useState([
    {
      orderId: "001",
      tableNumber: "T5",
      status: "new" as const,
      orderTime: new Date(Date.now() - 120000),
      items: [
        { name: "Chicken Burger", quantity: 2, ready: false },
        { name: "French Fries", quantity: 1, ready: false },
      ],
    },
    {
      orderId: "002",
      tableNumber: "T3",
      status: "preparing" as const,
      orderTime: new Date(Date.now() - 300000),
      items: [
        { name: "Veggie Pizza", quantity: 1, ready: false },
        { name: "Coca Cola", quantity: 2, ready: true },
      ],
    },
    {
      orderId: "003",
      tableNumber: "T8",
      status: "ready" as const,
      orderTime: new Date(Date.now() - 600000),
      items: [
        { name: "Pasta", quantity: 1, ready: true },
        { name: "Garlic Bread", quantity: 1, ready: true },
      ],
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: "new" | "preparing" | "ready") => {
    setOrders(
      orders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {orders.map((order) => (
        <KDSOrderCard
          key={order.orderId}
          {...order}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}