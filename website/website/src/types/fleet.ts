// This file defines shared TypeScript types for fleet data
// These types match what the backend returns

export interface MaintenanceEntry {
  id: string;
  date: string;
  type: "service" | "repair";
  description: string;
  technician: string;
}

export interface BusComponent {
  id: string;
  name: string;
  icon: string;
  status: "Good" | "Due Soon" | "Urgent";
  lastRepair: string;
  lastService: string;
  lastReplacement: string;
  healthPercent: number;
  history: MaintenanceEntry[];
  arInstructions: string[];
}

export interface Bus {
  id: string;
  name: string;
  plateNumber: string;
  status: "Operational" | "Needs Service" | "Under Repair";
  mileage: number;
  lastServiceDate: string;
  nextServiceDate: string;
  year: number;
  model: string;
  components: BusComponent[];
}