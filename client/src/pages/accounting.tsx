import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";

export default function AccountingPage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Accounting & Books" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Revenue" value="₹2,45,600" icon={DollarSign} color="green" trend={{ value: 12, isPositive: true }} />
          <StatCard title="Total Expenses" value="₹1,12,400" icon={TrendingDown} color="red" />
          <StatCard title="Net Profit" value="₹1,33,200" icon={TrendingUp} color="blue" trend={{ value: 18, isPositive: true }} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4">Profit & Loss Statement</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border"><span>Revenue</span><span className="font-semibold text-success">₹2,45,600</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span>Cost of Goods</span><span className="font-semibold text-danger">-₹85,200</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span>Operating Expenses</span><span className="font-semibold text-danger">-₹27,200</span></div>
              <div className="flex justify-between py-2 font-bold text-lg"><span>Net Profit</span><span className="text-success">₹1,33,200</span></div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4">Balance Sheet</h3>
            <div className="space-y-3">
              <div className="mb-3"><h4 className="font-medium mb-2">Assets</h4><div className="flex justify-between text-sm"><span>Cash & Bank</span><span>₹1,50,000</span></div><div className="flex justify-between text-sm mt-1"><span>Inventory</span><span>₹45,000</span></div></div>
              <div className="mb-3"><h4 className="font-medium mb-2">Liabilities</h4><div className="flex justify-between text-sm"><span>Accounts Payable</span><span>₹32,000</span></div></div>
              <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Equity</span><span>₹1,63,000</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}