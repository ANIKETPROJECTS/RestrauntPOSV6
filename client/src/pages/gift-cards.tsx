import { Plus, Gift } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GiftCard {
  id: string;
  code: string;
  balance: number;
  originalAmount: number;
  purchasedBy: string;
  status: "Active" | "Redeemed" | "Expired";
  expiryDate: string;
}

export default function GiftCardsPage() {
  const giftCards: GiftCard[] = [
    { id: "1", code: "GC-001-2024", balance: 1000, originalAmount: 1000, purchasedBy: "John Doe", status: "Active", expiryDate: "2024-12-31" },
    { id: "2", code: "GC-002-2024", balance: 250, originalAmount: 500, purchasedBy: "Jane Smith", status: "Active", expiryDate: "2024-11-30" },
    { id: "3", code: "GC-003-2024", balance: 0, originalAmount: 1500, purchasedBy: "Bob Johnson", status: "Redeemed", expiryDate: "2024-10-31" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, string> = {
      Active: "bg-success text-white",
      Redeemed: "bg-muted text-muted-foreground",
      Expired: "bg-danger text-white",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Gift Card Management" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Active Cards: <span className="font-semibold">{giftCards.filter(g => g.status === "Active").length}</span></span>
          </div>
          <Button data-testid="button-issue-gift-card"><Plus className="h-4 w-4 mr-2" />Issue Gift Card</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Card Code</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Purchased By</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Original Amount</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Balance</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Expiry Date</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {giftCards.map((card) => (
                <tr key={card.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-mono font-semibold">{card.code}</td>
                  <td className="py-3 px-4">{card.purchasedBy}</td>
                  <td className="py-3 px-4 text-right">₹{card.originalAmount}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">₹{card.balance}</td>
                  <td className="py-3 px-4 text-center text-sm text-muted-foreground">{card.expiryDate}</td>
                  <td className="py-3 px-4 text-center">{getStatusBadge(card.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}