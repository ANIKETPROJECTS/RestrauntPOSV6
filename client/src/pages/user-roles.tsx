import { Plus, Shield } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function UserRolesPage() {
  const roles = [
    { id: "1", name: "Manager", users: 2, permissions: ["All"] },
    { id: "2", name: "Chef", users: 3, permissions: ["Kitchen", "Menu"] },
    { id: "3", name: "Waiter", users: 8, permissions: ["Orders", "Tables"] },
    { id: "4", name: "Cashier", users: 2, permissions: ["Billing", "Payments"] },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="User Roles & Permissions" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Total Roles: {roles.length}</h3>
          <Button data-testid="button-add-role"><Plus className="h-4 w-4 mr-2" />Add Role</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-card border border-card-border rounded-lg p-6 hover-elevate">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><h3 className="font-semibold text-lg">{role.name}</h3></div>
                <span className="text-sm text-muted-foreground">{role.users} users</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm mb-2">Permissions:</h4>
                <div className="space-y-2">
                  {["Dashboard", "Orders", "Kitchen", "Menu", "Reports", "Settings"].map((perm) => (
                    <div key={perm} className="flex items-center gap-2">
                      <Checkbox checked={role.permissions.includes("All") || role.permissions.includes(perm)} />
                      <label className="text-sm">{perm}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}