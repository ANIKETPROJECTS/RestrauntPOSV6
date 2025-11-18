import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

export default function StaffPage() {
  const [staff] = useState<Staff[]>([
    { id: "1", name: "John Smith", role: "Manager", phone: "+91 9876543210", email: "john@restaurant.com", status: "Active", joinDate: "2023-01-15" },
    { id: "2", name: "Sarah Johnson", role: "Chef", phone: "+91 9876543211", email: "sarah@restaurant.com", status: "Active", joinDate: "2023-03-20" },
    { id: "3", name: "Mike Wilson", role: "Waiter", phone: "+91 9876543212", email: "mike@restaurant.com", status: "Active", joinDate: "2023-06-10" },
    { id: "4", name: "Emily Davis", role: "Cashier", phone: "+91 9876543213", email: "emily@restaurant.com", status: "Active", joinDate: "2023-08-05" },
  ]);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Staff Management" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Total Staff: {staff.length}</h3>
          <Button data-testid="button-add-staff">
            <Plus className="h-4 w-4 mr-2" />Add Staff
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Join Date</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4">{member.role}</td>
                  <td className="py-3 px-4 text-sm">
                    <div>{member.phone}</div>
                    <div className="text-muted-foreground">{member.email}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={member.status === "Active" ? "bg-success" : "bg-muted"}>
                      {member.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{member.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                    </div>
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