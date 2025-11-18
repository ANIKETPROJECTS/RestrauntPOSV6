import { Printer, Plus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface PrinterConfig {
  id: string;
  name: string;
  type: "KOT" | "Bill" | "Label";
  ip: string;
  status: "Online" | "Offline";
}

export default function PrinterConfigPage() {
  const { toast } = useToast();
  
  const printers: PrinterConfig[] = [
    { id: "1", name: "Kitchen Printer 1", type: "KOT", ip: "192.168.1.100", status: "Online" },
    { id: "2", name: "Billing Printer", type: "Bill", ip: "192.168.1.101", status: "Online" },
    { id: "3", name: "Label Printer", type: "Label", ip: "192.168.1.102", status: "Offline" },
  ];

  const handleTestPrint = async (printer: PrinterConfig) => {
    if (printer.status === "Offline") {
      toast({
        title: "Printer Offline",
        description: `${printer.name} is currently offline`,
        variant: "destructive",
      });
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        format: [80, 200],
        unit: "mm"
      });

      doc.setFontSize(16);
      doc.text("TEST PRINT", 40, 15, { align: "center" });
      
      doc.setFontSize(10);
      doc.text(`Printer: ${printer.name}`, 10, 30);
      doc.text(`Type: ${printer.type}`, 10, 40);
      doc.text(`IP: ${printer.ip}`, 10, 50);
      doc.text(`Status: ${printer.status}`, 10, 60);
      doc.text(`Time: ${new Date().toLocaleString()}`, 10, 70);
      
      doc.setFontSize(8);
      doc.text("This is a test print to verify", 10, 85);
      doc.text("printer configuration and connectivity.", 10, 92);

      window.open(doc.output('bloburl'), '_blank');

      toast({
        title: "Test Print Generated",
        description: `Test print preview opened for ${printer.name}`,
      });
    } catch (error) {
      toast({
        title: "Print Failed",
        description: "Unable to generate test print",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader title="Printer Configuration" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Total Printers: <span className="font-semibold">{printers.length}</span></span>
          </div>
          <Button data-testid="button-add-printer"><Plus className="h-4 w-4 mr-2" />Add Printer</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-4">
          {printers.map((printer) => (
            <div key={printer.id} className="bg-card border border-card-border rounded-lg p-4 sm:p-6 hover-elevate">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Printer className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">{printer.name}</h4>
                    <p className="text-sm text-muted-foreground">{printer.ip}</p>
                  </div>
                </div>
                <Badge className={printer.status === "Online" ? "bg-success" : "bg-danger"}>{printer.status}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-border gap-3">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Badge variant="outline">{printer.type}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Auto-print</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleTestPrint(printer)}
                    data-testid={`button-test-print-${printer.id}`}
                    className="flex-1 sm:flex-none"
                  >
                    Test Print
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-testid={`button-configure-${printer.id}`}
                    className="flex-1 sm:flex-none"
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}