import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export default function ReservationsPage() {
  const [reservations] = useState<Reservation[]>([
    { id: "1", customerName: "John Doe", phone: "+91 9876543210", date: "2024-01-25", time: "19:00", guests: 4, table: "T5", status: "Confirmed" },
    { id: "2", customerName: "Jane Smith", phone: "+91 9876543211", date: "2024-01-25", time: "20:00", guests: 2, table: "T3", status: "Pending" },
    { id: "3", customerName: "Bob Johnson", phone: "+91 9876543212", date: "2024-01-26", time: "18:30", guests: 6, table: "T8", status: "Confirmed" },
    { id: "4", customerName: "Alice Williams", phone: "+91 9876543213", date: "2024-01-26", time: "19:30", guests: 3, table: "T2", status: "Confirmed" },
  ]);

  const getStatusBadge = (status: string) => {
    const config: Record<string, string> = {
      Confirmed: "bg-success text-success-foreground",
      Pending: "bg-warning text-warning-foreground",
      Cancelled: "bg-danger text-danger-foreground",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Reservations Management" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-2" />Today</Button>
            <Button variant="outline" size="sm">This Week</Button>
          </div>
          <Button data-testid="button-add-reservation"><Plus className="h-4 w-4 mr-2" />New Reservation</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date & Time</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Guests</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Table</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{res.customerName}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{res.phone}</td>
                  <td className="py-3 px-4">{res.date} • {res.time}</td>
                  <td className="py-3 px-4 text-center">{res.guests}</td>
                  <td className="py-3 px-4 text-center"><Badge variant="outline">{res.table}</Badge></td>
                  <td className="py-3 px-4 text-center">{getStatusBadge(res.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}