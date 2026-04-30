import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api";
import { AuthHeader } from "@/components/AuthHeader";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const email = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const result = await loginUser(email, password);

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    navigate("/dashboard");
  } catch (err) {
    console.error("Login failed:", err);
    alert("Invalid email or password");
  }
};

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
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