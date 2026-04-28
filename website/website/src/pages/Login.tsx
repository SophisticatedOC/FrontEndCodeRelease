import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, LogIn } from "lucide-react";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Temporary open login: no username/password validation yet.
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container max-w-6xl flex items-center gap-3 py-4 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-none">FleetView</h1>
            <p className="text-xs text-muted-foreground">Fleet Maintenance Platform</p>
          </div>
          <div className="ml-auto">
            <AccessibilityToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-6xl px-4 py-10">
        <div className="mx-auto max-w-md rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Sign in to FleetView</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter a username and password to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Type your username"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Type your password"
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Temporary access is open while login security is being prepared.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;