import { Plus, Phone } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WaitingCustomer {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  waitTime: string;
  status: "Waiting" | "Notified" | "Seated";
}

export default function WaitingListPage() {
  const customers: WaitingCustomer[] = [
    { id: "1", name: "John Doe", phone: "+91 9876543210", partySize: 4, waitTime: "15 min", status: "Waiting" },
    { id: "2", name: "Jane Smith", phone: "+91 9876543211", partySize: 2, waitTime: "10 min", status: "Notified" },
    { id: "3", name: "Bob Johnson", phone: "+91 9876543212", partySize: 6, waitTime: "25 min", status: "Waiting" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Waiting List Management" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <span className="text-sm">Waiting: <span className="font-semibold">{customers.filter(c => c.status === "Waiting").length}</span></span>
          </div>
          <Button data-testid="button-add-to-waitlist"><Plus className="h-4 w-4 mr-2" />Add to Waitlist</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{customer.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{customer.phone}</span>
                    <span>Party Size: {customer.partySize}</span>
                    <span>Wait Time: {customer.waitTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={customer.status === "Waiting" ? "secondary" : customer.status === "Notified" ? "default" : "outline"}>
                    {customer.status}
                  </Badge>
                  {customer.status === "Waiting" && <Button size="sm">Notify</Button>}
                  {customer.status === "Notified" && <Button size="sm">Seat Now</Button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}