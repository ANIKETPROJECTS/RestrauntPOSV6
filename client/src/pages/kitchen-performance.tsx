import { ChefHat, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const hourlyPerformanceData = [
  { hour: "8AM", orders: 12, avgTime: 15 },
  { hour: "9AM", orders: 18, avgTime: 14 },
  { hour: "10AM", orders: 24, avgTime: 16 },
  { hour: "11AM", orders: 31, avgTime: 18 },
  { hour: "12PM", orders: 45, avgTime: 22 },
  { hour: "1PM", orders: 52, avgTime: 25 },
  { hour: "2PM", orders: 38, avgTime: 20 },
  { hour: "3PM", orders: 21, avgTime: 15 },
];

export default function KitchenPerformancePage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Kitchen Performance Reports" showSearch={false} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Avg Prep Time"
            value="18 min"
            icon={Clock}
            color="blue"
            trend={{ value: 12.5, isPositive: false }}
          />
          <StatCard
            title="Completed Orders"
            value={156}
            icon={CheckCircle}
            color="green"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Delayed Orders"
            value={8}
            icon={AlertCircle}
            color="red"
            trend={{ value: 3.1, isPositive: false }}
          />
          <StatCard
            title="Efficiency Rate"
            value="94.9%"
            icon={TrendingUp}
            color="green"
            trend={{ value: 5.4, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Orders by Hour</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(204 70% 53%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Average Preparation Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgTime" stroke="hsl(145 63% 42%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Kitchen Staff Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Chef Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Station</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Orders Completed</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Avg Prep Time</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Efficiency</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rajesh Kumar", station: "Main Kitchen", orders: 45, avgTime: 16, efficiency: 96.5, rating: 4.8 },
                  { name: "Priya Sharma", station: "Grill", orders: 38, avgTime: 18, efficiency: 94.2, rating: 4.7 },
                  { name: "Amit Patel", station: "Wok", orders: 42, avgTime: 17, efficiency: 95.8, rating: 4.9 },
                  { name: "Sneha Reddy", station: "Salad Bar", orders: 31, avgTime: 12, efficiency: 98.1, rating: 4.8 },
                ].map((chef, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4 font-medium">{chef.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{chef.station}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">{chef.orders}</td>
                    <td className="py-3 px-4 text-right">{chef.avgTime} min</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-green-600 font-semibold">{chef.efficiency}%</span>
                    </td>
                    <td className="py-3 px-4 text-right">{chef.rating} ⭐</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Order Status Breakdown</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { status: "New Orders", count: 12, color: "bg-blue-500" },
              { status: "Preparing", count: 8, color: "bg-yellow-500" },
              { status: "Ready", count: 5, color: "bg-green-500" },
              { status: "Delayed", count: 2, color: "bg-red-500" },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg text-center">
                <div className={`h-2 w-full ${item.color} rounded-full mb-3`}></div>
                <p className="text-2xl font-bold mb-1">{item.count}</p>
                <p className="text-sm text-muted-foreground">{item.status}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
