import { useState } from "react";
import OrderCart from "../OrderCart";

export default function OrderCartExample() {
  const [serviceType, setServiceType] = useState<"dine-in" | "delivery" | "pickup">("dine-in");
  const [items, setItems] = useState([
    { id: "1", name: "Chicken Burger", price: 199, quantity: 2 },
    { id: "2", name: "French Fries", price: 99, quantity: 1 },
    { id: "3", name: "Coca Cola", price: 50, quantity: 2 },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="h-screen w-96">
      <OrderCart
        items={items}
        serviceType={serviceType}
        onServiceTypeChange={(type) => {
          console.log("Service type changed to:", type);
          setServiceType(type);
        }}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => console.log("Checkout clicked")}
      />
    </div>
  );
}