import { Bus } from "lucide-react";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";

export function AuthHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container max-w-6xl flex items-center gap-3 py-4 px-4">
        
        <img
            src="/transitlens-logo.png"
            alt="TransitLens logo"
            className="h-9 w-9 rounded-lg object-contain"
        />

        <div>
          <h1 className="text-lg font-bold text-foreground leading-none">
            TransitLens
          </h1>
          <p className="text-xs text-muted-foreground">
            AR Maintenance System
          </p>
        </div>

        <div className="ml-auto">
            <AccessibilityToggle />
        </div>
      </div>
    </header>
  );
}