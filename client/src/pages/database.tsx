import { Database, Download, Upload, RefreshCw } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";

export default function DatabasePage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Database Management" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Database Size" value="245 MB" icon={Database} color="blue" />
          <StatCard title="Total Records" value="12,450" icon={Database} color="green" />
          <StatCard title="Last Backup" value="2 hours ago" icon={RefreshCw} color="yellow" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Download className="h-5 w-5" />Backup Database</h3>
            <p className="text-sm text-muted-foreground mb-4">Create a backup of your entire database</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2"><span className="text-sm">Include Orders</span><input type="checkbox" defaultChecked className="rounded" /></div>
              <div className="flex justify-between py-2"><span className="text-sm">Include Menu</span><input type="checkbox" defaultChecked className="rounded" /></div>
              <div className="flex justify-between py-2"><span className="text-sm">Include Customers</span><input type="checkbox" defaultChecked className="rounded" /></div>
              <div className="flex justify-between py-2"><span className="text-sm">Include Reports</span><input type="checkbox" defaultChecked className="rounded" /></div>
            </div>
            <Button className="w-full mt-4" data-testid="button-backup"><Download className="h-4 w-4 mr-2" />Create Backup</Button>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Upload className="h-5 w-5" />Restore Database</h3>
            <p className="text-sm text-muted-foreground mb-4">Restore database from a backup file</p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
              <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">.sql or .backup files only</p>
            </div>
            <Button className="w-full" variant="outline" data-testid="button-restore"><Upload className="h-4 w-4 mr-2" />Restore Backup</Button>
          </div>
        </div>

        <div className="mt-6 bg-card rounded-lg border border-card-border p-6">
          <h3 className="font-semibold text-lg mb-4">Backup History</h3>
          <div className="space-y-3">
            {["2024-01-22 14:30", "2024-01-21 14:30", "2024-01-20 14:30"].map((date, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">backup_{date.replace(/[:\s]/g, "_")}.sql</p>
                  <p className="text-sm text-muted-foreground">{date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                  <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Restore</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}