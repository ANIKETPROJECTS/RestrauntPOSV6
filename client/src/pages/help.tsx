import { Search, Book, Video, HelpCircle, Mail } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const faqs = [
    { question: "How do I add a new menu item?", answer: "Navigate to Menu Management and click the 'Add Item' button." },
    { question: "How to generate reports?", answer: "Go to Reports Dashboard and select the date range and report type." },
    { question: "How to process refunds?", answer: "Find the order in Order History and click the Refund button." },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Help & Support" showSearch={false} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for help..." className="pl-10 h-12 text-lg" data-testid="input-help-search" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
              <Book className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-3">Complete user guide and manuals</p>
              <Button variant="outline" size="sm">View Docs</Button>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
              <Video className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-3">Step-by-step video guides</p>
              <Button variant="outline" size="sm">Watch Videos</Button>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
              <Mail className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Get help from our team</p>
              <Button variant="outline" size="sm">Contact Us</Button>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><HelpCircle className="h-5 w-5" />Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-4 border-b border-border last:border-0">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}