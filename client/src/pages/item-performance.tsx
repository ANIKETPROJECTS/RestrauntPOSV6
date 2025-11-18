import { TrendingUp, Package, Star, DollarSign, ShoppingCart } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const topItemsData = [
  { name: "Veggie Pizza", sales: 13455, orders: 45 },
  { name: "Chicken Burger", sales: 7562, orders: 38 },
  { name: "French Fries", sales: 5148, orders: 52 },
  { name: "Coca Cola", sales: 3350, orders: 67 },
  { name: "Caesar Salad", sales: 3427, orders: 23 },
];

export default function ItemPerformancePage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Item Performance Reports" showSearch={true} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Items"
            value={247}
            icon={Package}
            color="blue"
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatCard
            title="Top Performer"
            value="Veggie Pizza"
            icon={Star}
            color="yellow"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Avg Item Revenue"
            value="₹467"
            icon={DollarSign}
            color="green"
            trend={{ value: 8.1, isPositive: true }}
          />
          <StatCard
            title="Total Item Sales"
            value={1245}
            icon={ShoppingCart}
            color="blue"
            trend={{ value: 6.3, isPositive: true }}
          />
        </div>

        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Top 5 Items by Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topItemsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="hsl(145 63% 42%)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Item Performance Details</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All Items</Button>
              <Button variant="outline" size="sm">Top Performers</Button>
              <Button variant="outline" size="sm">Low Performers</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Orders</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Avg Price</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Rating</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Veggie Pizza", category: "Pizza", orders: 45, revenue: 13455, price: 299, rating: 4.8, trend: 12 },
                  { name: "Chicken Burger", category: "Burgers", orders: 38, revenue: 7562, price: 199, rating: 4.6, trend: 8 },
                  { name: "French Fries", category: "Sides", orders: 52, revenue: 5148, price: 99, rating: 4.5, trend: -2 },
                  { name: "Coca Cola", category: "Beverages", orders: 67, revenue: 3350, price: 50, rating: 4.7, trend: 5 },
                  { name: "Caesar Salad", category: "Salads", orders: 23, revenue: 3427, price: 149, rating: 4.4, trend: 15 },
                  { name: "Margherita Pizza", category: "Pizza", orders: 41, revenue: 12259, price: 299, rating: 4.9, trend: 10 },
                  { name: "Pepsi", category: "Beverages", orders: 54, revenue: 2700, price: 50, rating: 4.6, trend: 3 },
                  { name: "Chicken Wings", category: "Starters", orders: 29, revenue: 5801, price: 199, rating: 4.7, trend: 7 },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">{item.orders}</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">₹{item.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">₹{item.price}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={item.trend >= 0 ? "text-green-600" : "text-red-600"}>
                        {item.trend >= 0 ? "+" : ""}{item.trend}%
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
