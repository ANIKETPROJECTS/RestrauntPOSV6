import { Building2, TrendingUp } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";

export default function MultiLocationPage() {
  const locations = [
    { id: "1", name: "Downtown Branch", sales: 125000, orders: 450, status: "Active" },
    { id: "2", name: "Mall Branch", sales: 98000, orders: 380, status: "Active" },
    { id: "3", name: "Airport Branch", sales: 156000, orders: 520, status: "Active" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Multi-Location Dashboard" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Locations" value={locations.length} icon={Building2} color="blue" />
          <StatCard title="Combined Sales" value="₹3,79,000" icon={TrendingUp} color="green" />
          <StatCard title="Total Orders" value={locations.reduce((sum, l) => sum + l.orders, 0)} icon={TrendingUp} color="yellow" />
        </div>

        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Orders</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{location.name}</td>
                  <td className="py-3 px-4 text-right font-semibold">₹{location.sales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{location.orders}</td>
                  <td className="py-3 px-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success">{location.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}