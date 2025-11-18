import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "yellow" | "red";
}

const colorClasses = {
  blue: "bg-primary/10 text-primary border-primary/20",
  green: "bg-success/10 text-success border-success/20",
  yellow: "bg-warning/10 text-warning border-warning/20",
  red: "bg-danger/10 text-danger border-danger/20",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
}: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-card-border p-6 hover-elevate" data-testid={`stat-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-card-foreground" data-testid={`value-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "text-sm mt-2",
                trend.isPositive ? "text-success" : "text-danger"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg border", colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}