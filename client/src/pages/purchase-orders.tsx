import { useState } from "react";
import { Plus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: number;
  total: number;
  status: "Draft" | "Sent" | "Received";
  date: string;
}

export default function PurchaseOrdersPage() {
  const [orders] = useState<PurchaseOrder[]>([
    { id: "1", poNumber: "PO-001", supplier: "ABC Suppliers", items: 5, total: 12500, status: "Sent", date: "2024-01-20" },
    { id: "2", poNumber: "PO-002", supplier: "XYZ Traders", items: 8, total: 18900, status: "Received", date: "2024-01-18" },
    { id: "3", poNumber: "PO-003", supplier: "Fresh Foods Co.", items: 12, total: 24500, status: "Draft", date: "2024-01-22" },
  ]);

  const getStatusBadge = (status: string) => {
    const config: Record<string, string> = {
      Draft: "bg-muted text-muted-foreground",
      Sent: "bg-warning text-white",
      Received: "bg-success text-white",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Purchase Orders" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Total POs: {orders.length}</h3>
          <Button data-testid="button-create-po"><Plus className="h-4 w-4 mr-2" />Create PO</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">PO Number</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Supplier</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Items</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Amount</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((po) => (
                <tr key={po.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{po.poNumber}</td>
                  <td className="py-3 px-4">{po.supplier}</td>
                  <td className="py-3 px-4 text-center">{po.items}</td>
                  <td className="py-3 px-4 text-right font-semibold">₹{po.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">{getStatusBadge(po.status)}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{po.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}