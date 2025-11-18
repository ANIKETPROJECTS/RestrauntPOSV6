import { useState } from "react";
import { Plus, Copy } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Coupon {
  id: string;
  code: string;
  discount: string;
  minOrder: number;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  status: "Active" | "Expired";
}

export default function CouponsPage() {
  const [coupons] = useState<Coupon[]>([
    { id: "1", code: "WELCOME20", discount: "20%", minOrder: 500, validUntil: "2024-02-28", usageLimit: 100, usedCount: 45, status: "Active" },
    { id: "2", code: "FIRST50", discount: "₹50", minOrder: 300, validUntil: "2024-01-31", usageLimit: 200, usedCount: 178, status: "Active" },
    { id: "3", code: "NEWYEAR", discount: "25%", minOrder: 1000, validUntil: "2024-01-15", usageLimit: 50, usedCount: 50, status: "Expired" },
  ]);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Coupon Management" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><Badge className="bg-success">Active</Badge><span className="text-sm">{coupons.filter(c => c.status === "Active").length}</span></div>
            <div className="flex items-center gap-2"><Badge className="bg-muted">Expired</Badge><span className="text-sm">{coupons.filter(c => c.status === "Expired").length}</span></div>
          </div>
          <Button data-testid="button-create-coupon"><Plus className="h-4 w-4 mr-2" />Create Coupon</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded font-mono font-bold text-primary">
                  {coupon.code}
                  <Button size="icon" variant="ghost" className="h-5 w-5"><Copy className="h-3 w-3" /></Button>
                </div>
                <Badge className={coupon.status === "Active" ? "bg-success" : "bg-muted"}>{coupon.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-semibold text-primary">{coupon.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Order:</span>
                  <span className="font-medium">₹{coupon.minOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Until:</span>
                  <span className="font-medium">{coupon.validUntil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usage:</span>
                  <span className="font-medium">{coupon.usedCount}/{coupon.usageLimit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}