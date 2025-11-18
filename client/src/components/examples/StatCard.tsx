import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import StatCard from "../StatCard";

export default function StatCardExample() {
  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      <StatCard
        title="Total Sales"
        value="₹45,320"
        icon={DollarSign}
        color="green"
        trend={{ value: 12.5, isPositive: true }}
      />
      <StatCard
        title="Orders"
        value={156}
        icon={ShoppingCart}
        color="blue"
        trend={{ value: 8.2, isPositive: true }}
      />
      <StatCard
        title="Customers"
        value={89}
        icon={Users}
        color="yellow"
        trend={{ value: 3.1, isPositive: false }}
      />
      <StatCard
        title="Growth"
        value="+18%"
        icon={TrendingUp}
        color="red"
        trend={{ value: 5.4, isPositive: true }}
      />
    </div>
  );
}