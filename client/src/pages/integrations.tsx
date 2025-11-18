import { Link2, CheckCircle } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "Connected" | "Available";
  logo: string;
}

export default function IntegrationsPage() {
  const integrations: Integration[] = [
    { id: "1", name: "Zomato", description: "Receive online orders from Zomato", status: "Connected", logo: "🍔" },
    { id: "2", name: "Swiggy", description: "Receive online orders from Swiggy", status: "Connected", logo: "🍕" },
    { id: "3", name: "Stripe", description: "Accept card payments", status: "Connected", logo: "💳" },
    { id: "4", name: "PayTM", description: "Accept UPI and wallet payments", status: "Available", logo: "📱" },
    { id: "5", name: "Google Analytics", description: "Track website analytics", status: "Available", logo: "📊" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Integration Settings" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Connected: <span className="font-semibold">{integrations.filter(i => i.status === "Connected").length}</span></span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="bg-card border border-card-border rounded-lg p-6 hover-elevate">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl mb-2">{integration.logo}</div>
                {integration.status === "Connected" ? (
                  <Badge className="bg-success"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>
                ) : (
                  <Badge variant="outline">Available</Badge>
                )}
              </div>
              <h4 className="font-semibold mb-2">{integration.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                {integration.status === "Connected" ? "Configure" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}