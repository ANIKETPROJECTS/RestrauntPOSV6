import { DollarSign, ShoppingCart, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const recentOrders = [
  { id: "#001", table: "T5", time: "2 min ago", status: "preparing", total: 450 },
  { id: "#002", table: "T3", time: "5 min ago", status: "ready", total: 680 },
  { id: "#003", table: "T8", time: "8 min ago", status: "new", total: 320 },
  { id: "#004", table: "T2", time: "12 min ago", status: "completed", total: 890 },
  { id: "#005", table: "T10", time: "15 min ago", status: "preparing", total: 540 },
];

const hourlyData = [
  { hour: "9AM", orders: 12 },
  { hour: "10AM", orders: 19 },
  { hour: "11AM", orders: 25 },
  { hour: "12PM", orders: 42 },
  { hour: "1PM", orders: 38 },
  { hour: "2PM", orders: 28 },
  { hour: "3PM", orders: 15 },
];

export default function DashboardPage() {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
      new: { variant: "destructive", color: "bg-danger" },
      preparing: { variant: "default", color: "bg-warning" },
      ready: { variant: "default", color: "bg-success" },
      completed: { variant: "secondary", color: "bg-muted" },
    };

    return (
      <Badge variant={variants[status]?.variant || "secondary"} className={variants[status]?.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader title="Dashboard" showSearch={true} />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Today's Sales"
            value="₹45,320"
            icon={DollarSign}
            color="green"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Today's Orders"
            value={156}
            icon={ShoppingCart}
            color="blue"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Total Customers"
            value={89}
            icon={Users}
            color="yellow"
            trend={{ value: 3.1, isPositive: false }}
          />
          <StatCard
            title="Avg Order Value"
            value="₹290"
            icon={TrendingUp}
            color="red"
            trend={{ value: 5.4, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-lg border border-card-border p-4 sm:p-6">
            <h3 className="font-semibold text-lg mb-4">Hourly Orders</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="hsl(204 70% 53%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-4 sm:p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Completed</span>
                </div>
                <span className="font-bold">124</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <span className="text-sm">Pending</span>
                </div>
                <span className="font-bold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">Tables Occupied</span>
                </div>
                <span className="font-bold">8/12</span>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <div className="text-sm text-muted-foreground mb-1">Avg Preparation Time</div>
                <div className="text-2xl font-bold text-foreground">12 min</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-card rounded-lg border border-card-border p-4 sm:p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Table</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.table}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4 text-right font-semibold">₹{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}