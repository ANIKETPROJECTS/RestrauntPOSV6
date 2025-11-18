import { Plus, Calendar, Users } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  package: string;
  status: "Confirmed" | "Pending" | "Completed";
}

export default function EventsPage() {
  const events: Event[] = [
    { id: "1", name: "Birthday Party - John Doe", date: "2024-01-30", time: "18:00", guests: 25, package: "Premium", status: "Confirmed" },
    { id: "2", name: "Corporate Meeting", date: "2024-02-05", time: "12:00", guests: 50, package: "Business", status: "Pending" },
    { id: "3", name: "Wedding Reception", date: "2024-02-15", time: "19:00", guests: 150, package: "Luxury", status: "Confirmed" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, string> = {
      Confirmed: "bg-success text-white",
      Pending: "bg-warning text-white",
      Completed: "bg-muted text-muted-foreground",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Event Booking" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Upcoming Events: {events.filter(e => e.status !== "Completed").length}</h3>
          <Button data-testid="button-add-event"><Plus className="h-4 w-4 mr-2" />Book Event</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{event.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{event.date} • {event.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" />{event.guests} guests</span>
                  </div>
                </div>
                {getStatusBadge(event.status)}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Badge variant="outline">{event.package} Package</Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Manage</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}