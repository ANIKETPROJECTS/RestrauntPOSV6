import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock } from "lucide-react";

interface DeliveryOrder {
  id: string;
  orderNumber: string;
  customer: string;
  address: string;
  phone: string;
  items: number;
  total: number;
  status: "pending" | "assigned" | "picked-up" | "delivered";
  assignedTo?: string;
  time: string;
}

export default function DeliveryPage() {
  const [orders] = useState<DeliveryOrder[]>([
    {
      id: "1",
      orderNumber: "#D001",
      customer: "John Doe",
      address: "123 Main St, Apt 4B",
      phone: "+91 9876543210",
      items: 3,
      total: 450,
      status: "pending",
      time: "5 min ago",
    },
    {
      id: "2",
      orderNumber: "#D002",
      customer: "Jane Smith",
      address: "456 Park Ave",
      phone: "+91 9876543211",
      items: 2,
      total: 380,
      status: "assigned",
      assignedTo: "Driver 1",
      time: "12 min ago",
    },
    {
      id: "3",
      orderNumber: "#D003",
      customer: "Bob Johnson",
      address: "789 Oak Rd",
      phone: "+91 9876543212",
      items: 5,
      total: 720,
      status: "picked-up",
      assignedTo: "Driver 2",
      time: "25 min ago",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
      pending: { variant: "destructive", color: "bg-danger" },
      assigned: { variant: "default", color: "bg-warning" },
      "picked-up": { variant: "default", color: "bg-primary" },
      delivered: { variant: "default", color: "bg-success" },
    };

    return (
      <Badge variant={config[status]?.variant || "secondary"} className={config[status]?.color}>
        {status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Delivery Management" />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Active Delivery Orders</h3>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-card-border rounded-lg p-4 hover-elevate"
                data-testid={`delivery-order-${order.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{order.orderNumber}</h4>
                    <p className="text-sm text-muted-foreground">{order.time}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{order.customer}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{order.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{order.items} items • </span>
                    <span className="font-semibold">₹{order.total}</span>
                  </div>
                  {order.status === "pending" ? (
                    <Button size="sm" data-testid={`button-assign-${order.id}`}>
                      Assign Driver
                    </Button>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Assigned to: <span className="font-medium text-foreground">{order.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-80 border-l border-border p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4">Delivery Personnel</h3>
          <div className="space-y-3">
            {["Driver 1", "Driver 2", "Driver 3"].map((driver, index) => (
              <div key={index} className="bg-card border border-card-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{driver}</h4>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    Available
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>2 deliveries today</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}