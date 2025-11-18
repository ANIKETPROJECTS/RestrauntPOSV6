import { Plus, Mail, MessageSquare } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Template {
  id: string;
  name: string;
  subject: string;
  type: "Email" | "SMS";
  status: "Active" | "Draft";
}

export default function EmailTemplatesPage() {
  const templates: Template[] = [
    { id: "1", name: "Order Confirmation", subject: "Your order has been confirmed", type: "Email", status: "Active" },
    { id: "2", name: "Booking Reminder", subject: "Your reservation is tomorrow", type: "SMS", status: "Active" },
    { id: "3", name: "Feedback Request", subject: "How was your experience?", type: "Email", status: "Active" },
    { id: "4", name: "Promotional Offer", subject: "Special discount just for you", type: "Email", status: "Draft" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Email/SMS Templates" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <Tabs defaultValue="email" className="w-auto">
            <TabsList>
              <TabsTrigger value="email"><Mail className="h-4 w-4 mr-2" />Email</TabsTrigger>
              <TabsTrigger value="sms"><MessageSquare className="h-4 w-4 mr-2" />SMS</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button data-testid="button-create-template"><Plus className="h-4 w-4 mr-2" />Create Template</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {template.type === "Email" ? <Mail className="h-5 w-5 text-primary" /> : <MessageSquare className="h-5 w-5 text-success" />}
                  <h4 className="font-semibold">{template.name}</h4>
                </div>
                <Badge className={template.status === "Active" ? "bg-success" : "bg-muted"}>{template.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{template.subject}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="outline" size="sm" className="flex-1">Preview</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}