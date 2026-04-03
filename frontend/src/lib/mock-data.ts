export interface EmissionRecord {
  id: number;
  description: string;
  category: string;
  supplier: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  emission: number;
  emissionLow: number;
  emissionHigh: number;
  confidence: number;
  date: string;
  source: string;
}

export interface PipelineStep {
  label: string;
  icon: string;
  status: "completed" | "active" | "pending";
  duration?: string;
}

export interface InsightItem {
  text: string;
  type: "info" | "warning" | "success";
}

export const emissionRecords: EmissionRecord[] = [
  {
    id: 1,
    description: "Cold-rolled steel coils",
    category: "Metals",
    supplier: "ArcelorMittal India",
    quantity: 120,
    unit: "tonnes",
    unitPrice: 2.5,
    emission: 300,
    emissionLow: 264,
    emissionHigh: 336,
    confidence: 91,
    date: "2024-11-03",
    source: "Invoice #INV-2341",
  },
  {
    id: 2,
    description: "LDPE packaging film",
    category: "Plastics",
    supplier: "Reliance Polymers",
    quantity: 500,
    unit: "kg",
    unitPrice: 3.1,
    emission: 1550,
    emissionLow: 1395,
    emissionHigh: 1705,
    confidence: 87,
    date: "2024-11-05",
    source: "PO-00892",
  },
  {
    id: 3,
    description: "40ft container — port to warehouse",
    category: "Transport",
    supplier: "Maersk Logistics",
    quantity: 3,
    unit: "shipments",
    unitPrice: 1.8,
    emission: 5.4,
    emissionLow: 4.6,
    emissionHigh: 6.2,
    confidence: 93,
    date: "2024-11-07",
    source: "BOL-77451",
  },
  {
    id: 4,
    description: "Dell P2422H monitors (batch)",
    category: "Electronics",
    supplier: "Dell Technologies",
    quantity: 25,
    unit: "units",
    unitPrice: 50,
    emission: 1250,
    emissionLow: 1050,
    emissionHigh: 1450,
    confidence: 78,
    date: "2024-11-09",
    source: "Invoice #DL-8820",
  },
  {
    id: 5,
    description: "A4 paper reams (80gsm)",
    category: "Office Supplies",
    supplier: "ITC Paperboards",
    quantity: 200,
    unit: "reams",
    unitPrice: 0.5,
    emission: 100,
    emissionLow: 88,
    emissionHigh: 112,
    confidence: 95,
    date: "2024-11-10",
    source: "Invoice #ITC-1192",
  },
  {
    id: 6,
    description: "Insulated copper wiring",
    category: "Metals",
    supplier: "Havells Ltd",
    quantity: 80,
    unit: "kg",
    unitPrice: 2.5,
    emission: 200,
    emissionLow: 174,
    emissionHigh: 226,
    confidence: 89,
    date: "2024-11-11",
    source: "PO-01033",
  },
  {
    id: 7,
    description: "Last-mile courier — metro zone",
    category: "Transport",
    supplier: "Delhivery",
    quantity: 45,
    unit: "deliveries",
    unitPrice: 1.8,
    emission: 81,
    emissionLow: 64.8,
    emissionHigh: 97.2,
    confidence: 72,
    date: "2024-11-12",
    source: "Receipt batch",
  },
  {
    id: 8,
    description: "PVC-U pipe fittings (SWR)",
    category: "Plastics",
    supplier: "Astral Ltd",
    quantity: 300,
    unit: "pieces",
    unitPrice: 3.1,
    emission: 930,
    emissionLow: 837,
    emissionHigh: 1023,
    confidence: 84,
    date: "2024-11-14",
    source: "Invoice #AST-4510",
  },
  {
    id: 9,
    description: "Mixed office consumables",
    category: "Other",
    supplier: "Amazon Business",
    quantity: 10,
    unit: "items",
    unitPrice: 1,
    emission: 10,
    emissionLow: 7,
    emissionHigh: 13,
    confidence: 65,
    date: "2024-11-15",
    source: "Expense claim #EXP-221",
  },
  {
    id: 10,
    description: "USB-C laptop chargers (65W)",
    category: "Electronics",
    supplier: "Lenovo India",
    quantity: 50,
    unit: "units",
    unitPrice: 50,
    emission: 2500,
    emissionLow: 2100,
    emissionHigh: 2900,
    confidence: 76,
    date: "2024-11-16",
    source: "Invoice #LEN-3390",
  },
  {
    id: 11,
    description: "EPDM rubber gaskets",
    category: "Plastics",
    supplier: "Freudenberg Sealing",
    quantity: 1000,
    unit: "pieces",
    unitPrice: 3.1,
    emission: 3100,
    emissionLow: 2790,
    emissionHigh: 3410,
    confidence: 88,
    date: "2024-11-18",
    source: "PO-01299",
  },
  {
    id: 12,
    description: "6061-T6 aluminium sheets",
    category: "Metals",
    supplier: "Hindalco Industries",
    quantity: 60,
    unit: "sheets",
    unitPrice: 2.5,
    emission: 150,
    emissionLow: 132,
    emissionHigh: 168,
    confidence: 92,
    date: "2024-11-20",
    source: "Invoice #HIN-7742",
  },
  {
    id: 13,
    description: "Diesel — fleet vehicles",
    category: "Energy",
    supplier: "Indian Oil Corp",
    quantity: 800,
    unit: "litres",
    unitPrice: 1.1,
    emission: 2120,
    emissionLow: 1908,
    emissionHigh: 2332,
    confidence: 94,
    date: "2024-11-21",
    source: "Fleet card statement",
  },
  {
    id: 14,
    description: "Cardboard cartons (double wall)",
    category: "Office Supplies",
    supplier: "Packza Packaging",
    quantity: 400,
    unit: "units",
    unitPrice: 0.5,
    emission: 240,
    emissionLow: 204,
    emissionHigh: 276,
    confidence: 86,
    date: "2024-11-22",
    source: "Invoice #PKZ-0118",
  },
  {
    id: 15,
    description: "Cloud compute (AWS EC2 instances)",
    category: "Other",
    supplier: "Amazon Web Services",
    quantity: 720,
    unit: "hours",
    unitPrice: 0.4,
    emission: 58,
    emissionLow: 43.5,
    emissionHigh: 72.5,
    confidence: 68,
    date: "2024-11-23",
    source: "AWS invoice Nov-2024",
  },
];

export const pipelineSteps: PipelineStep[] = [
  { label: "Ingestion", icon: "upload", status: "completed", duration: "1.2s" },
  { label: "OCR / Parse", icon: "file-search", status: "completed", duration: "3.8s" },
  { label: "NLP Extract", icon: "brain", status: "completed", duration: "2.1s" },
  { label: "Classify", icon: "git-branch", status: "active", duration: "—" },
  { label: "Factor Lookup", icon: "calculator", status: "pending" },
  { label: "Report", icon: "file-output", status: "pending" },
];

export const insights: InsightItem[] = [
  { text: "Plastics contribute 42% of total Scope 3 — consider bio-based alternatives from certified suppliers.", type: "warning" },
  { text: "4 items below 80% confidence. Manual category review recommended before final report.", type: "warning" },
  { text: "Transport emissions dropped 18% quarter-over-quarter after switching to consolidated freight.", type: "success" },
  { text: "Consolidating 3 metal suppliers into 1 regional vendor could save ~45 tCO₂e per year.", type: "info" },
  { text: "Cloud compute emissions (58 kg) are low but growing 30% MoM — track going forward.", type: "info" },
];

export const categoryBreakdown = [
  { name: "Metals", value: 650, fill: "#6366f1" },
  { name: "Plastics", value: 5580, fill: "#f43f5e" },
  { name: "Transport", value: 86.4, fill: "#f59e0b" },
  { name: "Electronics", value: 3750, fill: "#06b6d4" },
  { name: "Office Supplies", value: 340, fill: "#22c55e" },
  { name: "Energy", value: 2120, fill: "#ef4444" },
  { name: "Other", value: 68, fill: "#94a3b8" },
];

export const monthlyTrend = [
  { month: "Jun", emissions: 9800 },
  { month: "Jul", emissions: 10400 },
  { month: "Aug", emissions: 11200 },
  { month: "Sep", emissions: 10900 },
  { month: "Oct", emissions: 11800 },
  { month: "Nov", emissions: 12594 },
];

export const supplierBreakdown = [
  { name: "Reliance Polymers", emissions: 1550, items: 1 },
  { name: "Freudenberg Sealing", emissions: 3100, items: 1 },
  { name: "Lenovo India", emissions: 2500, items: 1 },
  { name: "Indian Oil Corp", emissions: 2120, items: 1 },
  { name: "Dell Technologies", emissions: 1250, items: 1 },
  { name: "ArcelorMittal India", emissions: 300, items: 1 },
];

export const metrics = {
  totalEmissions: 12594.4,
  avgConfidence: 84,
  itemsProcessed: 15,
  highRiskItems: 4,
  suppliersTracked: 14,
  documentsIngested: 15,
};
