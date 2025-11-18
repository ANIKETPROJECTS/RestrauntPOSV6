import { TrendingUp, Users, ShoppingCart, Clock } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const revenueData = [
  { month: "Jul", revenue: 45000 },
  { month: "Aug", revenue: 52000 },
  { month: "Sep", revenue: 48000 },
  { month: "Oct", revenue: 61000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 67000 },
  { month: "Jan", revenue: 72000 },
];

const customerData = [
  { name: "New", value: 35 },
  { name: "Returning", value: 65 },
];

const COLORS = ["hsl(145 63% 42%)", "hsl(204 70% 53%)"];

export default function AnalyticsPage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Analytics Dashboard" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Revenue Growth" value="+18%" icon={TrendingUp} color="green" trend={{ value: 5.2, isPositive: true }} />
          <StatCard title="Customer Retention" value="65%" icon={Users} color="blue" />
          <StatCard title="Avg Order Value" value="₹340" icon={ShoppingCart} color="yellow" trend={{ value: 8.1, isPositive: true }} />
          <StatCard title="Peak Hour" value="7-9 PM" icon={Clock} color="red" />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4">Revenue Trend (Last 7 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(204 70% 53%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4">Customer Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={customerData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {customerData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-card-border p-6">
          <h3 className="font-semibold text-lg mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
              <div className="w-1 h-full bg-success rounded"></div>
              <div>
                <h4 className="font-medium">Revenue increased by 18% this month</h4>
                <p className="text-sm text-muted-foreground">Compared to last month, showing strong growth in customer orders</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="w-1 h-full bg-primary rounded"></div>
              <div>
                <h4 className="font-medium">Peak hours: 7 PM - 9 PM</h4>
                <p className="text-sm text-muted-foreground">Consider staffing adjustments during peak hours for better service</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
              <div className="w-1 h-full bg-warning rounded"></div>
              <div>
                <h4 className="font-medium">65% returning customers</h4>
                <p className="text-sm text-muted-foreground">High customer retention rate indicates strong satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}