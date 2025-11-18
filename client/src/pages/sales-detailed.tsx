import { DollarSign, TrendingUp, Calendar, Download, FileText } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const salesTrendData = [
  { date: "Jan 1", sales: 12000, orders: 45, avgOrder: 267 },
  { date: "Jan 2", sales: 15000, orders: 52, avgOrder: 288 },
  { date: "Jan 3", sales: 13500, orders: 48, avgOrder: 281 },
  { date: "Jan 4", sales: 18000, orders: 61, avgOrder: 295 },
  { date: "Jan 5", sales: 16500, orders: 55, avgOrder: 300 },
  { date: "Jan 6", sales: 21000, orders: 68, avgOrder: 309 },
  { date: "Jan 7", sales: 19500, orders: 64, avgOrder: 305 },
];

const paymentMethodData = [
  { name: "Cash", value: 35 },
  { name: "Card", value: 40 },
  { name: "UPI", value: 20 },
  { name: "Wallet", value: 5 },
];

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];

export default function SalesDetailedPage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Detailed Sales Reports" showSearch={false} />

      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm">Last 30 Days</Button>
            <Button variant="outline" size="sm">This Month</Button>
            <Button variant="outline" size="sm">Custom Range</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Revenue"
            value="₹1,15,500"
            icon={DollarSign}
            color="green"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Total Orders"
            value={393}
            icon={TrendingUp}
            color="blue"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Avg Order Value"
            value="₹294"
            icon={DollarSign}
            color="green"
            trend={{ value: 5.4, isPositive: true }}
          />
          <StatCard
            title="Daily Avg Sales"
            value="₹16,500"
            icon={TrendingUp}
            color="yellow"
            trend={{ value: 3.1, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2 p-6">
            <h3 className="font-semibold text-lg mb-4">Sales Trend (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="hsl(145 63% 42%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Payment Methods</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Daily Sales Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Orders</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Avg Order</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody>
                {salesTrendData.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4 font-medium">{item.date}</td>
                    <td className="py-3 px-4 text-right">{item.orders}</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">₹{item.sales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">₹{item.avgOrder}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={index % 2 === 0 ? "text-green-600" : "text-red-600"}>
                        {index % 2 === 0 ? "+" : "-"}{(Math.random() * 10).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
