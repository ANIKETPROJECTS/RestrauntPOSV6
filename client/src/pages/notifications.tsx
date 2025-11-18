import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const notifications: Notification[] = [
    { id: "1", type: "success", title: "New Order", message: "Order #001 placed from Table 5", time: "2 min ago", read: false },
    { id: "2", type: "warning", title: "Low Stock", message: "Tomatoes stock is low (8 kg remaining)", time: "15 min ago", read: false },
    { id: "3", type: "info", title: "Shift Started", message: "John Smith clocked in for evening shift", time: "1 hour ago", read: true },
    { id: "4", type: "success", title: "Payment Received", message: "₹4,500 received for Invoice INV-001", time: "2 hours ago", read: true },
  ];

  const getIcon = (type: string) => {
    if (type === "success") return <CheckCircle className="h-5 w-5 text-success" />;
    if (type === "warning") return <AlertTriangle className="h-5 w-5 text-warning" />;
    return <Info className="h-5 w-5 text-primary" />;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Notifications" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span className="font-medium">{unreadCount} Unread</span>
          </div>
          <Button variant="outline" size="sm" data-testid="button-mark-all-read">Mark All as Read</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {notifications.map((notif) => (
            <div key={notif.id} className={`bg-card border border-card-border rounded-lg p-4 hover-elevate ${!notif.read ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex items-start gap-3">
                {getIcon(notif.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold">{notif.title}</h4>
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                </div>
                {!notif.read && <Badge className="bg-primary">New</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}