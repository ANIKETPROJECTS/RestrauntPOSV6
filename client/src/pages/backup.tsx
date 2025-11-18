import { Database, Download, Upload, History, HardDrive, Clock } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BackupPage() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="System Backup & Restore" showSearch={false} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="p-6 text-center">
            <Database className="h-12 w-12 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold text-lg mb-2">Database Size</h3>
            <p className="text-3xl font-bold text-blue-500">245 MB</p>
          </Card>
          <Card className="p-6 text-center">
            <HardDrive className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold text-lg mb-2">Total Backups</h3>
            <p className="text-3xl font-bold text-green-500">23</p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-12 w-12 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold text-lg mb-2">Last Backup</h3>
            <p className="text-lg font-medium text-purple-500">2 hours ago</p>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Create New Backup
            </h3>
            <p className="text-muted-foreground mb-4">
              Create a complete backup of your restaurant data including orders, menu, customers, and settings.
            </p>
            <div className="space-y-3">
              <Button className="w-full" variant="default">
                <Database className="h-4 w-4 mr-2" />
                Manual Backup Now
              </Button>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data (CSV)
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Scheduled Backups</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Daily Automatic Backup</p>
                  <p className="text-sm text-muted-foreground">Every day at 2:00 AM</p>
                </div>
                <Badge variant="default" className="bg-green-500">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Weekly Full Backup</p>
                  <p className="text-sm text-muted-foreground">Every Sunday at 3:00 AM</p>
                </div>
                <Badge variant="default" className="bg-green-500">Active</Badge>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <History className="h-5 w-5 mr-2" />
            Backup History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2024-01-15 02:00", type: "Auto - Daily", size: "245 MB", status: "success" },
                  { date: "2024-01-14 02:00", type: "Auto - Daily", size: "243 MB", status: "success" },
                  { date: "2024-01-14 15:30", type: "Manual", size: "243 MB", status: "success" },
                  { date: "2024-01-13 02:00", type: "Auto - Daily", size: "241 MB", status: "success" },
                  { date: "2024-01-12 02:00", type: "Auto - Daily", size: "239 MB", status: "success" },
                ].map((backup, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover-elevate">
                    <td className="py-3 px-4">{backup.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{backup.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{backup.size}</td>
                    <td className="py-3 px-4">
                      <Badge variant="default" className="bg-green-500">
                        {backup.status === "success" ? "Success" : "Failed"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">Restore</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
