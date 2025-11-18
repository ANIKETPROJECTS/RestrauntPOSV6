import { useState } from "react";
import { Plus, Star } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";

interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  rating: number;
  totalPurchases: number;
}

export default function SuppliersPage() {
  const [suppliers] = useState<Supplier[]>([
    { id: "1", name: "ABC Suppliers", category: "Meat & Poultry", contact: "+91 9876543210", email: "abc@suppliers.com", rating: 4.5, totalPurchases: 125000 },
    { id: "2", name: "XYZ Traders", category: "Vegetables", contact: "+91 9876543211", email: "xyz@traders.com", rating: 4.2, totalPurchases: 89000 },
    { id: "3", name: "Fresh Foods Co.", category: "Dairy", contact: "+91 9876543212", email: "info@freshfoods.com", rating: 4.8, totalPurchases: 156000 },
    { id: "4", name: "Beverage Distributors", category: "Beverages", contact: "+91 9876543213", email: "sales@beverages.com", rating: 4.0, totalPurchases: 67000 },
  ]);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Supplier Management" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Total Suppliers: {suppliers.length}</h3>
          <Button data-testid="button-add-supplier"><Plus className="h-4 w-4 mr-2" />Add Supplier</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Supplier Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Rating</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Purchases</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{supplier.name}</td>
                  <td className="py-3 px-4">{supplier.category}</td>
                  <td className="py-3 px-4 text-sm">
                    <div>{supplier.contact}</div>
                    <div className="text-muted-foreground">{supplier.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">₹{supplier.totalPurchases.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}