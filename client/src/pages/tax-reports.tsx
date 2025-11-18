import { Download, FileText } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";

export default function TaxReportsPage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Tax Reports (GST)" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Total GST Collected" value="₹12,450" icon={FileText} color="green" />
          <StatCard title="Input Tax Credit" value="₹8,200" icon={FileText} color="blue" />
          <StatCard title="Net GST Payable" value="₹4,250" icon={FileText} color="red" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-card-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">GSTR-1 Report</h3>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Outward supplies report for the current month</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm">B2B Sales</span>
                <span className="font-semibold">₹45,300</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm">B2C Sales</span>
                <span className="font-semibold">₹28,600</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium">Total</span>
                <span className="font-bold text-lg">₹73,900</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">GSTR-3B Report</h3>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Summary return for the current month</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm">Output Tax</span>
                <span className="font-semibold">₹12,450</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm">Input Tax Credit</span>
                <span className="font-semibold">₹8,200</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium">Tax Payable</span>
                <span className="font-bold text-lg text-danger">₹4,250</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-card rounded-lg border border-card-border p-6">
          <h3 className="font-semibold text-lg mb-4">Tax Summary (HSN)</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">HSN Code</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Taxable Value</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Rate</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover-elevate">
                <td className="py-3 px-4">1001</td>
                <td className="py-3 px-4">Food Items</td>
                <td className="py-3 px-4 text-right">₹45,000</td>
                <td className="py-3 px-4 text-center">5%</td>
                <td className="py-3 px-4 text-right font-semibold">₹2,250</td>
              </tr>
              <tr className="border-b border-border hover-elevate">
                <td className="py-3 px-4">2202</td>
                <td className="py-3 px-4">Beverages</td>
                <td className="py-3 px-4 text-right">₹12,000</td>
                <td className="py-3 px-4 text-center">12%</td>
                <td className="py-3 px-4 text-right font-semibold">₹1,440</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}