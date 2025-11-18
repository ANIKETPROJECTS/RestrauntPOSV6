import { Trash2, TrendingDown, AlertTriangle, Package, DollarSign } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const wastageByCategory = [
  { name: "Vegetables", value: 25 },
  { name: "Dairy", value: 15 },
  { name: "Meat", value: 20 },
  { name: "Prepared Food", value: 30 },
  { name: "Others", value: 10 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const dailyWastageData = [
  { day: "Mon", quantity: 4.5, cost: 1200 },
  { day: "Tue", quantity: 3.2, cost: 900 },
  { day: "Wed", quantity: 5.1, cost: 1450 },
  { day: "Thu", quantity: 3.8, cost: 1050 },
  { day: "Fri", quantity: 6.2, cost: 1800 },
  { day: "Sat", quantity: 5.5, cost: 1600 },
  { day: "Sun", quantity: 4.9, cost: 1350 },
];

export default function WastagePage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Wastage Management" showSearch={false} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Wastage (Week)"
            value="33.2 kg"
            icon={Trash2}
            color="red"
            trend={{ value: 12.5, isPositive: false }}
          />
          <StatCard
            title="Wastage Cost"
            value="₹9,350"
            icon={DollarSign}
            color="red"
            trend={{ value: 8.2, isPositive: false }}
          />
          <StatCard
            title="Wastage Rate"
            value="4.2%"
            icon={TrendingDown}
            color="yellow"
            trend={{ value: 3.1, isPositive: false }}
          />
          <StatCard
            title="Items at Risk"
            value={14}
            icon={AlertTriangle}
            color="blue"
            trend={{ value: 5.4, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2 p-6">
            <h3 className="font-semibold text-lg mb-4">Daily Wastage Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyWastageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="hsl(0 84% 60%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Wastage by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={wastageByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wastageByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Wastage Records</h3>
            <Button size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Add Wastage Entry
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Reason</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2024-01-15", item: "Tomatoes", category: "Vegetables", quantity: "2.5 kg", cost: 250, reason: "Expired", recordedBy: "Kitchen Manager" },
                  { date: "2024-01-15", item: "Chicken Breast", category: "Meat", quantity: "1.2 kg", cost: 480, reason: "Spoiled", recordedBy: "Chef" },
                  { date: "2024-01-14", item: "Pizza Dough", category: "Prepared Food", quantity: "3 units", cost: 150, reason: "Over-prepared", recordedBy: "Kitchen Manager" },
                  { date: "2024-01-14", item: "Lettuce", category: "Vegetables", quantity: "1.5 kg", cost: 120, reason: "Wilted", recordedBy: "Prep Cook" },
                  { date: "2024-01-13", item: "Milk", category: "Dairy", quantity: "2 L", cost: 100, reason: "Expired", recordedBy: "Kitchen Manager" },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4 font-medium">{item.item}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">{item.quantity}</td>
                    <td className="py-3 px-4 text-right text-red-600 font-semibold">₹{item.cost}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{item.reason}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{item.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Items Nearing Expiry</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Expiry Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Days Left</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Fresh Cream", category: "Dairy", quantity: "5 L", expiry: "2024-01-17", days: 2, value: 750 },
                  { name: "Bell Peppers", category: "Vegetables", quantity: "3 kg", expiry: "2024-01-18", days: 3, value: 420 },
                  { name: "Chicken Stock", category: "Prepared Food", quantity: "8 L", expiry: "2024-01-19", days: 4, value: 960 },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">{item.quantity}</td>
                    <td className="py-3 px-4">{item.expiry}</td>
                    <td className="py-3 px-4">
                      <Badge variant="destructive">{item.days} days</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">₹{item.value}</td>
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
