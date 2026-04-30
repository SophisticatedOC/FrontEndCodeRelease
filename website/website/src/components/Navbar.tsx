import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";

export function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container max-w-6xl flex items-center px-4 py-4">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
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
        </div>

        {/* CENTER: Navigation */}
        <nav className="flex items-center gap-2 mx-auto">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/ar" className={linkClass}>
            AR View
          </NavLink>

          <NavLink to="/tool-tracker" className={linkClass}>
            Tool Tracker
          </NavLink>

          <NavLink to="/maintenance-reports" className={linkClass}>
            Maintenance Reports
          </NavLink>
        </nav>

        {/* RIGHT: Accessibility */}
        <div className="ml-auto flex items-center gap-3">
            <AccessibilityToggle />

            <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
            Logout
            </button>
        </div>

      </div>
    </header>
  );
}