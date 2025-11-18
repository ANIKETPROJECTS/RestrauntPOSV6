import { Shield, User, Edit, Trash2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";

interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
}

export default function AuditLogsPage() {
  const logs: AuditLog[] = [
    { id: "1", user: "John Doe", action: "Created", resource: "Menu Item: Chicken Burger", timestamp: "2024-01-22 14:30", ipAddress: "192.168.1.1" },
    { id: "2", user: "Sarah Johnson", action: "Updated", resource: "Order #1234", timestamp: "2024-01-22 14:15", ipAddress: "192.168.1.5" },
    { id: "3", user: "Mike Wilson", action: "Deleted", resource: "Customer: Old Account", timestamp: "2024-01-22 13:45", ipAddress: "192.168.1.3" },
    { id: "4", user: "John Doe", action: "Login", resource: "System Access", timestamp: "2024-01-22 09:00", ipAddress: "192.168.1.1" },
  ];

  const getActionIcon = (action: string) => {
    if (action === "Created") return <User className="h-4 w-4 text-success" />;
    if (action === "Updated") return <Edit className="h-4 w-4 text-primary" />;
    if (action === "Deleted") return <Trash2 className="h-4 w-4 text-danger" />;
    return <Shield className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Audit Logs" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resource</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 text-sm text-muted-foreground">{log.timestamp}</td>
                  <td className="py-3 px-4 font-medium">{log.user}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2">{getActionIcon(log.action)}<span>{log.action}</span></div></td>
                  <td className="py-3 px-4">{log.resource}</td>
                  <td className="py-3 px-4 text-right text-sm font-mono">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}