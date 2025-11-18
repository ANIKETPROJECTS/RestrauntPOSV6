import { useState } from "react";
import { Plus, Percent } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Offer {
  id: string;
  name: string;
  type: string;
  discount: string;
  validFrom: string;
  validUntil: string;
  status: "Active" | "Inactive";
}

export default function OffersPage() {
  const [offers] = useState<Offer[]>([
    { id: "1", name: "Happy Hour", type: "Time-based", discount: "20%", validFrom: "2024-01-01", validUntil: "2024-01-31", status: "Active" },
    { id: "2", name: "Buy 1 Get 1", type: "BOGO", discount: "50%", validFrom: "2024-01-15", validUntil: "2024-01-30", status: "Active" },
    { id: "3", name: "Weekend Special", type: "Day-based", discount: "15%", validFrom: "2024-01-01", validUntil: "2024-02-28", status: "Active" },
  ]);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Offers & Promotions" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><Percent className="h-5 w-5 text-muted-foreground" /><span className="text-sm">Active Offers: <span className="font-semibold">{offers.filter(o => o.status === "Active").length}</span></span></div>
          </div>
          <Button data-testid="button-add-offer"><Plus className="h-4 w-4 mr-2" />Create Offer</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Offer Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Discount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Valid Period</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{offer.name}</td>
                  <td className="py-3 px-4"><Badge variant="outline">{offer.type}</Badge></td>
                  <td className="py-3 px-4 text-center font-semibold text-primary">{offer.discount}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{offer.validFrom} to {offer.validUntil}</td>
                  <td className="py-3 px-4 text-center"><Badge className={offer.status === "Active" ? "bg-success" : "bg-muted"}>{offer.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}