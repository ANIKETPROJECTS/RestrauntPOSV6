import { useState } from "react";
import { Plus, AlertTriangle, Package } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  lastUpdated: string;
}

export default function InventoryPage() {
  const [items] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Chicken Breast",
      category: "Meat",
      currentStock: 25,
      minStock: 20,
      unit: "kg",
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Mozzarella Cheese",
      category: "Dairy",
      currentStock: 15,
      minStock: 10,
      unit: "kg",
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      name: "Tomatoes",
      category: "Vegetables",
      currentStock: 8,
      minStock: 15,
      unit: "kg",
      lastUpdated: "3 hours ago",
    },
    {
      id: "4",
      name: "Lettuce",
      category: "Vegetables",
      currentStock: 12,
      minStock: 10,
      unit: "kg",
      lastUpdated: "5 hours ago",
    },
    {
      id: "5",
      name: "Coca Cola",
      category: "Beverages",
      currentStock: 48,
      minStock: 50,
      unit: "bottles",
      lastUpdated: "1 hour ago",
    },
  ]);

  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage <= 50) return { status: "Critical", color: "bg-danger", textColor: "text-danger" };
    if (percentage <= 100) return { status: "Low", color: "bg-warning", textColor: "text-warning" };
    return { status: "Good", color: "bg-success", textColor: "text-success" };
  };

  const lowStockCount = items.filter((item) => item.currentStock <= item.minStock).length;

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Inventory Management" />

      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                Total Items: <span className="font-semibold">{items.length}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="text-sm">
                Low Stock: <span className="font-semibold text-warning">{lowStockCount}</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Adjust Stock</Button>
            <Button size="sm" data-testid="button-add-item">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Current Stock</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Min Stock</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock Level</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minStock);
                const stockPercentage = Math.min((item.currentStock / item.minStock) * 100, 100);

                return (
                  <tr key={item.id} className="border-b border-border last:border-0 hover-elevate" data-testid={`inventory-item-${item.id}`}>
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4 text-center font-semibold">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-center text-muted-foreground">
                      {item.minStock} {item.unit}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={stockPercentage} className="flex-1" />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {stockPercentage.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={stockStatus.color}>{stockStatus.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                      {item.lastUpdated}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}