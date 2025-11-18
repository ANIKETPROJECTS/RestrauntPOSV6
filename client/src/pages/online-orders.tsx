import { useState } from "react";
import { Check, X } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OnlineOrder {
  id: string;
  platform: "Zomato" | "Swiggy" | "Website";
  orderNumber: string;
  customer: string;
  items: number;
  total: number;
  status: "Pending" | "Accepted" | "Rejected";
  time: string;
}

export default function OnlineOrdersPage() {
  const [orders, setOrders] = useState<OnlineOrder[]>([
    { id: "1", platform: "Zomato", orderNumber: "#ZOM1234", customer: "John Doe", items: 3, total: 450, status: "Pending", time: "2 min ago" },
    { id: "2", platform: "Swiggy", orderNumber: "#SWG5678", customer: "Jane Smith", items: 2, total: 380, status: "Accepted", time: "5 min ago" },
    { id: "3", platform: "Website", orderNumber: "#WEB9012", customer: "Bob Johnson", items: 4, total: 620, status: "Pending", time: "8 min ago" },
  ]);

  const handleAccept = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "Accepted" as const } : o));
  };

  const handleReject = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "Rejected" as const } : o));
  };

  const getPlatformBadge = (platform: string) => {
    const config: Record<string, string> = {
      Zomato: "bg-danger text-white",
      Swiggy: "bg-warning text-white",
      Website: "bg-primary text-white",
    };
    return <Badge className={config[platform]}>{platform}</Badge>;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Online Orders Integration" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getPlatformBadge(order.platform)}
                    <span className="font-semibold">{order.orderNumber}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.time}</p>
                </div>
                <Badge variant={order.status === "Pending" ? "destructive" : order.status === "Accepted" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.items} items • ₹{order.total}</p>
                </div>
                {order.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAccept(order.id)} className="bg-success"><Check className="h-4 w-4 mr-1" />Accept</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(order.id)}><X className="h-4 w-4 mr-1" />Reject</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}