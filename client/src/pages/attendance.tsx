import { useState } from "react";
import { Calendar } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AttendanceRecord {
  id: string;
  employee: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: "Present" | "Late" | "Absent";
  totalHours: number;
}

export default function AttendancePage() {
  const [records] = useState<AttendanceRecord[]>([
    { id: "1", employee: "John Smith", date: "2024-01-22", clockIn: "09:00", clockOut: "18:00", status: "Present", totalHours: 9 },
    { id: "2", employee: "Sarah Johnson", date: "2024-01-22", clockIn: "09:15", clockOut: "18:00", status: "Late", totalHours: 8.75 },
    { id: "3", employee: "Mike Wilson", date: "2024-01-22", clockIn: "09:00", clockOut: "18:00", status: "Present", totalHours: 9 },
    { id: "4", employee: "Emily Davis", date: "2024-01-22", clockIn: "-", clockOut: "-", status: "Absent", totalHours: 0 },
  ]);

  const getStatusBadge = (status: string) => {
    const config: Record<string, string> = {
      Present: "bg-success text-white",
      Late: "bg-warning text-white",
      Absent: "bg-danger text-white",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Attendance & Shifts" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-2" />Today - Jan 22, 2024</Button>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><Badge className="bg-success">Present</Badge><span className="text-sm">{records.filter(r => r.status === "Present").length}</span></div>
            <div className="flex items-center gap-2"><Badge className="bg-warning">Late</Badge><span className="text-sm">{records.filter(r => r.status === "Late").length}</span></div>
            <div className="flex items-center gap-2"><Badge className="bg-danger">Absent</Badge><span className="text-sm">{records.filter(r => r.status === "Absent").length}</span></div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Clock In</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Clock Out</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Total Hours</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 font-medium">{record.employee}</td>
                  <td className="py-3 px-4 text-muted-foreground">{record.date}</td>
                  <td className="py-3 px-4 text-center">{record.clockIn}</td>
                  <td className="py-3 px-4 text-center">{record.clockOut}</td>
                  <td className="py-3 px-4 text-center font-semibold">{record.totalHours}h</td>
                  <td className="py-3 px-4 text-center">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}