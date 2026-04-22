import { BusCard } from "@/components/BusCard";
import { fleet } from "@/data/fleetData";
import { Bus, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
[]
const Index = () => {
  const operational = fleet.filter(b => b.status === "Operational").length;
  const needsService = fleet.filter(b => b.status === "Needs Service").length;
  const underRepair = fleet.filter(b => b.status === "Under Repair").length;

  const stats = [
    { label: "Total Fleet", value: fleet.length, icon: Bus, color: "text-primary bg-primary/10" },
    { label: "Operational", value: operational, icon: CheckCircle2, color: "text-status-operational bg-status-operational/10" },
    { label: "Needs Service", value: needsService, icon: AlertTriangle, color: "text-status-service bg-status-service/10" },
    { label: "Under Repair", value: underRepair, icon: Wrench, color: "text-status-repair bg-status-repair/10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
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

      <main className="container max-w-6xl px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-lg border bg-card p-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet Grid */}
        <div>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Fleet Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleet.map(bus => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
