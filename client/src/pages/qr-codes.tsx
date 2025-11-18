import { QrCode, Download, Plus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";

export default function QRCodesPage() {
  const qrCodes = [
    { id: "1", name: "Table 1 - Menu QR", type: "Menu", table: "T1" },
    { id: "2", name: "Table 2 - Menu QR", type: "Menu", table: "T2" },
    { id: "3", name: "Payment QR", type: "Payment", table: "-" },
    { id: "4", name: "Feedback QR", type: "Feedback", table: "-" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="QR Code Management" showSearch={false} />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Total QR Codes: {qrCodes.length}</h3>
          <Button data-testid="button-generate-qr"><Plus className="h-4 w-4 mr-2" />Generate QR</Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4">
          {qrCodes.map((qr) => (
            <div key={qr.id} className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
              <div className="w-32 h-32 mx-auto mb-3 bg-muted rounded flex items-center justify-center">
                <QrCode className="h-20 w-20 text-muted-foreground" />
              </div>
              <h4 className="font-semibold mb-1">{qr.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{qr.type}</p>
              <Button variant="outline" size="sm" className="w-full"><Download className="h-4 w-4 mr-2" />Download</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}