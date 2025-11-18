import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="User Profile" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border border-card-border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">JD</div>
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Manager</p>
              </div>
            </div>

            <div className="space-y-4">
              <div><Label>Full Name</Label><Input defaultValue="John Doe" data-testid="input-name" /></div>
              <div><Label>Email</Label><Input type="email" defaultValue="john@restaurant.com" data-testid="input-email" /></div>
              <div><Label>Phone</Label><Input defaultValue="+91 9876543210" data-testid="input-phone" /></div>
              <div><Label>Role</Label><Input defaultValue="Manager" disabled /></div>
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold mb-4">Change Password</h3>
                <div className="space-y-3">
                  <div><Label>Current Password</Label><Input type="password" data-testid="input-current-password" /></div>
                  <div><Label>New Password</Label><Input type="password" data-testid="input-new-password" /></div>
                  <div><Label>Confirm Password</Label><Input type="password" data-testid="input-confirm-password" /></div>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1" data-testid="button-save-profile">Save Changes</Button>
                <Button variant="outline" className="flex-1" data-testid="button-cancel">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}