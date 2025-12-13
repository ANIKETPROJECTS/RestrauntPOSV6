import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DbErrorPage() {
  const [, setLocation] = useLocation();

  const handleRetry = () => {
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 via-background to-warning/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-card-border shadow-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2" data-testid="text-error-title">
            Database Connection Failed
          </h1>
          
          <p className="text-muted-foreground mb-6" data-testid="text-error-message">
            Unable to connect to the restaurant database. This could be due to an invalid database configuration or network issues.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={handleRetry} 
              className="w-full" 
              data-testid="button-retry-login"
            >
              Try Again
            </Button>
            
            <p className="text-sm text-muted-foreground">
              If this problem persists, please contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
