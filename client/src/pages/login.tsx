import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { username, password, rememberMe });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-card-border shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🍽️</div>
            <h1 className="text-3xl font-bold text-primary mb-2">RestaurantPOS</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="input-username"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  data-testid="checkbox-remember"
                />
                <label className="text-sm">Remember me</label>
              </div>
              <Button
                variant="link"
                className="text-sm p-0 h-auto"
                type="button"
                data-testid="button-forgot-password"
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full" size="lg" data-testid="button-login">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials: admin / admin123</p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 RestaurantPOS. All rights reserved.
        </p>
      </div>
    </div>
  );
}