import { CreditCard, DollarSign, Wallet } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

interface Payment {
  id: string;
  method: "Cash" | "Card" | "UPI";
  amount: number;
  orders: number;
  date: string;
}

export default function PaymentSettlementPage() {
  const payments: Payment[] = [
    { id: "1", method: "Cash", amount: 28500, orders: 45, date: "2024-01-22" },
    { id: "2", method: "Card", amount: 42300, orders: 38, date: "2024-01-22" },
    { id: "3", method: "UPI", amount: 15800, orders: 22, date: "2024-01-22" },
  ];

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Payment Settlement" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Collected" value={`₹${totalAmount.toLocaleString()}`} icon={DollarSign} color="green" />
          <StatCard title="Total Orders" value={payments.reduce((sum, p) => sum + p.orders, 0)} icon={Wallet} color="blue" />
          <StatCard title="Pending Settlement" value="₹12,400" icon={CreditCard} color="yellow" />
        </div>

        <div className="bg-card rounded-lg border border-card-border mb-6">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-lg">Payment Breakdown</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Method</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Orders</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={payment.method === "Cash" ? "bg-success/10" : payment.method === "Card" ? "bg-primary/10" : "bg-warning/10"}>
                      {payment.method}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">{payment.orders}</td>
                  <td className="py-3 px-4 text-right font-semibold">₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" data-testid="button-export">Export Report</Button>
          <Button data-testid="button-settle">Settle Payments</Button>
        </div>
      </div>
    </div>
  );
}