import AppHeader from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";

interface Commission {
  id: string;
  employee: string;
  role: string;
  sales: number;
  rate: number;
  commission: number;
  status: "Paid" | "Pending";
}

export default function CommissionPage() {
  const commissions: Commission[] = [
    { id: "1", employee: "John Smith", role: "Manager", sales: 125000, rate: 5, commission: 6250, status: "Paid" },
    { id: "2", employee: "Sarah Johnson", role: "Waiter", sales: 45000, rate: 3, commission: 1350, status: "Pending" },
    { id: "3", employee: "Mike Wilson", role: "Waiter", sales: 38000, rate: 3, commission: 1140, status: "Pending" },
    { id: "4", employee: "Emily Davis", role: "Cashier", sales: 52000, rate: 2, commission: 1040, status: "Paid" },
  ];

  const totalCommission = commissions.reduce((sum, c) => sum + c.commission, 0);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Commission Management" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex gap-8">
          <div><div className="text-2xl font-bold">₹{totalCommission.toLocaleString()}</div><p className="text-sm text-muted-foreground">Total Commission</p></div>
          <div><div className="text-2xl font-bold text-warning">{commissions.filter(c => c.status === "Pending").length}</div><p className="text-sm text-muted-foreground">Pending Payments</p></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Rate</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Commission</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((comm) => (
                <tr key={comm.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{comm.employee}</td>
                  <td className="py-3 px-4">{comm.role}</td>
                  <td className="py-3 px-4 text-right">₹{comm.sales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">{comm.rate}%</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">₹{comm.commission.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={comm.status === "Paid" ? "bg-success" : "bg-warning"}>{comm.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}