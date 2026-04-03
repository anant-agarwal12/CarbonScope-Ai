export interface EmissionRecord {
  id: number;
  description: string;
  category: string;
  quantity: number;
  emission: number;
  confidence: number;
}

export interface PipelineStep {
  label: string;
  icon: string;
  status: "completed" | "active" | "pending";
}

export interface InsightItem {
  text: string;
  type: "info" | "warning" | "success";
}

export const emissionRecords: EmissionRecord[] = [
  { id: 1, description: "Steel coils from supplier A", category: "Metals", quantity: 120, emission: 300.0, confidence: 91 },
  { id: 2, description: "Polyethylene packaging film", category: "Plastics", quantity: 500, emission: 1550.0, confidence: 87 },
  { id: 3, description: "Freight shipping — port to warehouse", category: "Transport", quantity: 3, emission: 5.4, confidence: 93 },
  { id: 4, description: "Dell monitors (batch order)", category: "Electronics", quantity: 25, emission: 1250.0, confidence: 78 },
  { id: 5, description: "A4 paper reams", category: "Office Supplies", quantity: 200, emission: 100.0, confidence: 95 },
  { id: 6, description: "Copper wiring stock", category: "Metals", quantity: 80, emission: 200.0, confidence: 89 },
  { id: 7, description: "Courier service — last mile", category: "Transport", quantity: 45, emission: 81.0, confidence: 72 },
  { id: 8, description: "PVC pipe fittings", category: "Plastics", quantity: 300, emission: 930.0, confidence: 84 },
  { id: 9, description: "Miscellaneous office items", category: "Other", quantity: 10, emission: 10.0, confidence: 65 },
  { id: 10, description: "Laptop chargers (USB-C)", category: "Electronics", quantity: 50, emission: 2500.0, confidence: 76 },
  { id: 11, description: "Rubber gaskets", category: "Plastics", quantity: 1000, emission: 3100.0, confidence: 88 },
  { id: 12, description: "Aluminium sheets", category: "Metals", quantity: 60, emission: 150.0, confidence: 92 },
];

export const pipelineSteps: PipelineStep[] = [
  { label: "Upload", icon: "upload", status: "completed" },
  { label: "Extraction", icon: "file-search", status: "completed" },
  { label: "Classification", icon: "brain", status: "completed" },
  { label: "Mapping", icon: "git-branch", status: "active" },
  { label: "Estimation", icon: "calculator", status: "pending" },
  { label: "Output", icon: "file-output", status: "pending" },
];

export const insights: InsightItem[] = [
  { text: "Plastics contribute 42% of total emissions — consider alternative sourcing.", type: "warning" },
  { text: "3 items flagged for low confidence (<75%). Manual review recommended.", type: "warning" },
  { text: "Transport emissions reduced 18% vs. last quarter.", type: "success" },
  { text: "Optimization opportunity: consolidating freight shipments could save ~12 tCO₂e.", type: "info" },
];

export const categoryBreakdown = [
  { name: "Metals", value: 650, fill: "#6366f1" },
  { name: "Plastics", value: 5580, fill: "#f43f5e" },
  { name: "Transport", value: 86.4, fill: "#f59e0b" },
  { name: "Electronics", value: 3750, fill: "#06b6d4" },
  { name: "Office Supplies", value: 100, fill: "#22c55e" },
  { name: "Other", value: 10, fill: "#94a3b8" },
];

export const metrics = {
  totalEmissions: 10176.4,
  avgConfidence: 84,
  itemsProcessed: 12,
  highRiskItems: 3,
};
