import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2, ChevronRight, X, Smartphone } from "lucide-react";
import type { BusComponent } from "@/data/fleetData";
import { cn } from "@/lib/utils";

interface ARViewProps {
  open: boolean;
  onClose: () => void;
  component: BusComponent | null;
}

export function ARView({ open, onClose, component }: ARViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (!component) return null;

  const instructions = component.arInstructions;

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleClose = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Simulated AR camera view */}
        <div className="relative bg-foreground/95 aspect-[4/3] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-4 border-2 border-dashed border-primary/50 rounded-lg" />
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-primary/70" />
            <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-primary/70" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-primary/70" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-primary/70" />
          </div>

          <div className="text-center z-10 space-y-3">
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-2 border-primary/50 flex items-center justify-center animate-pulse-slow">
                <Camera className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-primary font-bold text-lg">{component.name}</p>
              <p className="text-primary/60 text-xs">AR Component Overlay</p>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-primary/50 text-xs">
              <Smartphone className="h-3 w-3" />
              <span>Point camera at bus to detect component</span>
            </div>
          </div>

          {/* AR overlay indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-primary font-medium">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            AR Active
          </div>

          <button onClick={handleClose} className="absolute top-3 right-3 text-primary/60 hover:text-primary">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step-by-step instructions */}
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          <h4 className="text-sm font-bold text-foreground">Repair / Service Instructions</h4>
          {instructions.map((step, i) => (
            <button
              key={i}
              onClick={() => { setCurrentStep(i); toggleStep(i); }}
              className={cn(
                "w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-all text-sm",
                currentStep === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/30",
                completedSteps.has(i) && "opacity-60"
              )}
            >
              <div className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                completedSteps.has(i)
                  ? "bg-status-good/20 text-status-good"
                  : currentStep === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {completedSteps.has(i) ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("flex-1", completedSteps.has(i) && "line-through")}>{step}</span>
              {currentStep === i && !completedSteps.has(i) && <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />}
            </button>
          ))}

          <div className="pt-2">
            <p className="text-xs text-muted-foreground text-center">
              {completedSteps.size}/{instructions.length} steps completed
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
