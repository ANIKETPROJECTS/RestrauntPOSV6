import { DollarSign, CreditCard, Wallet } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";

export default function DayEndSettlementPage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Day End Settlement" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Cash Sales" value="₹28,500" icon={Wallet} color="green" />
          <StatCard title="Card Sales" value="₹42,300" icon={CreditCard} color="blue" />
          <StatCard title="Total Sales" value="₹70,800" icon={DollarSign} color="red" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4">Sales Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border"><span>Opening Cash</span><span className="font-semibold">₹5,000</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span>Cash Sales</span><span className="font-semibold">₹28,500</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span>Card Sales</span><span className="font-semibold">₹42,300</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span>Cash Expenses</span><span className="font-semibold text-danger">-₹3,200</span></div>
              <div className="flex justify-between py-2 font-bold text-lg"><span>Closing Cash</span><span>₹30,300</span></div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4">Cash Count</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span>₹2000 x 10</span><span>₹20,000</span></div>
              <div className="flex justify-between text-sm"><span>₹500 x 12</span><span>₹6,000</span></div>
              <div className="flex justify-between text-sm"><span>₹200 x 8</span><span>₹1,600</span></div>
              <div className="flex justify-between text-sm"><span>₹100 x 15</span><span>₹1,500</span></div>
              <div className="flex justify-between text-sm"><span>₹50 x 20</span><span>₹1,000</span></div>
              <div className="flex justify-between text-sm"><span>Coins</span><span>₹200</span></div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold"><span>Total Counted</span><span>₹30,300</span></div>
            </div>
            <div className="flex justify-between p-3 bg-success/10 rounded-lg"><span className="font-medium">Difference</span><span className="font-bold text-success">₹0</span></div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" data-testid="button-save-draft">Save Draft</Button>
          <Button data-testid="button-close-day">Close Day</Button>
        </div>
      </div>
    </div>
  );
}