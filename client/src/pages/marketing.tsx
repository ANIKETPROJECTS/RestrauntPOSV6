import { Plus, Send, Users, TrendingUp } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

interface Campaign {
  id: string;
  name: string;
  channel: "Email" | "SMS" | "Push";
  audience: number;
  sent: number;
  opens: number;
  status: "Active" | "Scheduled" | "Completed";
}

export default function MarketingPage() {
  const campaigns: Campaign[] = [
    { id: "1", name: "Weekend Special", channel: "Email", audience: 1200, sent: 1200, opens: 720, status: "Completed" },
    { id: "2", name: "New Menu Launch", channel: "SMS", audience: 850, sent: 850, opens: 595, status: "Completed" },
    { id: "3", name: "Happy Hour Reminder", channel: "Push", audience: 2400, sent: 0, opens: 0, status: "Scheduled" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Marketing Campaigns" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Campaigns" value={campaigns.length} icon={Send} color="blue" />
          <StatCard title="Total Audience" value="4,450" icon={Users} color="green" />
          <StatCard title="Avg Open Rate" value="62%" icon={TrendingUp} color="yellow" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Campaigns</h3>
          <Button data-testid="button-create-campaign"><Plus className="h-4 w-4 mr-2" />Create Campaign</Button>
        </div>

        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign Name</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Channel</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Audience</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sent</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Opens</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => {
                const openRate = campaign.sent > 0 ? ((campaign.opens / campaign.sent) * 100).toFixed(1) : 0;
                return (
                  <tr key={campaign.id} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4 font-medium">{campaign.name}</td>
                    <td className="py-3 px-4 text-center"><Badge variant="outline">{campaign.channel}</Badge></td>
                    <td className="py-3 px-4 text-right">{campaign.audience.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{campaign.sent.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{campaign.opens.toLocaleString()} <span className="text-xs text-muted-foreground">({openRate}%)</span></td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={campaign.status === "Active" ? "bg-success" : campaign.status === "Scheduled" ? "bg-warning" : "bg-muted"}>
                        {campaign.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}