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
  { id: 1,  description: "Cold-rolled steel coils",         category: "Metals",           supplier: "ArcelorMittal India",   quantity: 120,  unit: "tonnes",    unitPrice: 2850, emission: 300,  emissionLow: 264,   emissionHigh: 336,   confidence: 93, date: "2024-11-03", source: "Invoice #INV-2341" },
  { id: 2,  description: "LDPE packaging film",             category: "Plastics",         supplier: "Reliance Polymers",     quantity: 500,  unit: "kg",        unitPrice: 1.2,  emission: 1550, emissionLow: 1395,  emissionHigh: 1705,  confidence: 87, date: "2024-11-05", source: "PO-00892" },
  { id: 3,  description: "40ft container — port to warehouse", category: "Transport",     supplier: "Maersk Logistics",      quantity: 3,    unit: "shipments", unitPrice: 4500, emission: 5.4,  emissionLow: 4.6,   emissionHigh: 6.2,   confidence: 94, date: "2024-11-07", source: "BOL-77451" },
  { id: 4,  description: "Dell P2422H monitors (batch)",    category: "Electronics",      supplier: "Dell Technologies",     quantity: 25,   unit: "units",     unitPrice: 18500,emission: 1250, emissionLow: 1050,  emissionHigh: 1450,  confidence: 78, date: "2024-11-09", source: "Invoice #DL-8820" },
  { id: 5,  description: "A4 paper reams (80gsm)",          category: "Office Supplies",  supplier: "ITC Paperboards",       quantity: 200,  unit: "reams",     unitPrice: 320,  emission: 100,  emissionLow: 88,    emissionHigh: 112,   confidence: 95, date: "2024-11-10", source: "Invoice #ITC-1192" },
  { id: 6,  description: "Insulated copper wiring",         category: "Metals",           supplier: "Havells Ltd",           quantity: 80,   unit: "kg",        unitPrice: 540,  emission: 200,  emissionLow: 174,   emissionHigh: 226,   confidence: 89, date: "2024-11-11", source: "PO-01033" },
  { id: 7,  description: "Last-mile courier — metro zone",  category: "Transport",        supplier: "Delhivery",             quantity: 45,   unit: "deliveries",unitPrice: 180,  emission: 81,   emissionLow: 64.8,  emissionHigh: 97.2,  confidence: 72, date: "2024-11-12", source: "Receipt batch" },
  { id: 8,  description: "PVC-U pipe fittings (SWR)",       category: "Plastics",         supplier: "Astral Ltd",            quantity: 300,  unit: "pieces",    unitPrice: 890,  emission: 930,  emissionLow: 837,   emissionHigh: 1023,  confidence: 84, date: "2024-11-14", source: "Invoice #AST-4510" },
  { id: 9,  description: "Mixed office consumables",        category: "Other",            supplier: "Amazon Business",       quantity: 10,   unit: "items",     unitPrice: 5400, emission: 10,   emissionLow: 7,     emissionHigh: 13,    confidence: 65, date: "2024-11-15", source: "Expense claim #EXP-221" },
  { id: 10, description: "USB-C laptop chargers (65W)",     category: "Electronics",      supplier: "Lenovo India",          quantity: 50,   unit: "units",     unitPrice: 1200, emission: 2500, emissionLow: 2100,  emissionHigh: 2900,  confidence: 76, date: "2024-11-16", source: "Invoice #LEN-3390" },
  { id: 11, description: "EPDM rubber gaskets",             category: "Plastics",         supplier: "Freudenberg Sealing",   quantity: 1000, unit: "pieces",    unitPrice: 2.2,  emission: 3100, emissionLow: 2790,  emissionHigh: 3410,  confidence: 88, date: "2024-11-18", source: "PO-01299" },
  { id: 12, description: "6061-T6 aluminium sheets",        category: "Metals",           supplier: "Hindalco Industries",   quantity: 60,   unit: "sheets",    unitPrice: 1450, emission: 150,  emissionLow: 132,   emissionHigh: 168,   confidence: 92, date: "2024-11-20", source: "Invoice #HIN-7742" },
  { id: 13, description: "Diesel — fleet vehicles",         category: "Energy",           supplier: "Indian Oil Corp",       quantity: 800,  unit: "litres",    unitPrice: 76.5, emission: 2144, emissionLow: 2037,  emissionHigh: 2251,  confidence: 96, date: "2024-11-21", source: "Fleet card statement" },
  { id: 14, description: "Cardboard cartons (double wall)", category: "Office Supplies",  supplier: "Packza Packaging",      quantity: 400,  unit: "units",     unitPrice: 120,  emission: 240,  emissionLow: 204,   emissionHigh: 276,   confidence: 86, date: "2024-11-22", source: "Invoice #PKZ-0118" },
  { id: 15, description: "Cloud compute (AWS EC2)",         category: "Other",            supplier: "Amazon Web Services",   quantity: 720,  unit: "hours",     unitPrice: 0.42, emission: 58,   emissionLow: 43.5,  emissionHigh: 72.5,  confidence: 68, date: "2024-11-23", source: "AWS invoice Nov-2024" },
  { id: 16, description: "Epoxy adhesive DP460",            category: "Chemicals",        supplier: "3M Industrial",         quantity: 50,   unit: "kg",        unitPrice: 320,  emission: 210,  emissionLow: 172,   emissionHigh: 248,   confidence: 82, date: "2024-11-24", source: "PO-01455" },
  { id: 17, description: "Cotton work uniforms",            category: "Textiles",         supplier: "Raymond Workwear",      quantity: 150,  unit: "units",     unitPrice: 890,  emission: 2250, emissionLow: 1800,  emissionHigh: 2700,  confidence: 85, date: "2024-11-25", source: "Invoice #RW-3321" },
  { id: 18, description: "Polyester fabric roll 300GSM",    category: "Textiles",         supplier: "Arvind Mills",          quantity: 200,  unit: "metres",    unitPrice: 65,   emission: 3000, emissionLow: 2400,  emissionHigh: 3600,  confidence: 81, date: "2024-11-26", source: "Invoice #ARV-5510" },
  { id: 19, description: "Natural gas — boiler heating",    category: "Energy",           supplier: "GAIL India",            quantity: 3000, unit: "m³",        unitPrice: 28.5, emission: 8040, emissionLow: 7638,  emissionHigh: 8442,  confidence: 97, date: "2024-11-27", source: "Utility bill Nov-2024" },
  { id: 20, description: "Solvent-based paint primer",      category: "Chemicals",        supplier: "Asian Paints Industrial",quantity: 100, unit: "litres",    unitPrice: 420,  emission: 420,  emissionLow: 344,   emissionHigh: 496,   confidence: 80, date: "2024-11-28", source: "PO-01502" },
  { id: 21, description: "Rice — canteen supplies",         category: "Food & Agriculture",supplier: "Local Agri Co-op",     quantity: 500,  unit: "kg",        unitPrice: 45,   emission: 1750, emissionLow: 1365,  emissionHigh: 2135,  confidence: 83, date: "2024-11-29", source: "Receipt #LC-8810" },
  { id: 22, description: "Palm oil — industrial lubricant", category: "Food & Agriculture",supplier: "Wilmar International", quantity: 400,  unit: "kg",        unitPrice: 82,   emission: 1400, emissionLow: 1092,  emissionHigh: 1708,  confidence: 77, date: "2024-12-01", source: "Invoice #WI-2204" },
  { id: 23, description: "Cleaning agents industrial",      category: "Chemicals",        supplier: "Diversey Holdings",     quantity: 80,   unit: "litres",    unitPrice: 55,   emission: 336,  emissionLow: 275,   emissionHigh: 397,   confidence: 79, date: "2024-12-02", source: "PO-01588" },
  { id: 24, description: "Stainless steel fasteners M8",    category: "Metals",           supplier: "Sundram Fasteners",     quantity: 2000, unit: "pieces",    unitPrice: 12.5, emission: 5000, emissionLow: 4400,  emissionHigh: 5600,  confidence: 91, date: "2024-12-03", source: "Invoice #SF-0091" },
  { id: 25, description: "Air cargo DEL→SFO urgent",        category: "Transport",        supplier: "FedEx Express",         quantity: 2,    unit: "shipments", unitPrice: 8200, emission: 3.6,  emissionLow: 3.06,  emissionHigh: 4.14,  confidence: 90, date: "2024-12-04", source: "AWB-99120334" },
  { id: 26, description: "Cisco 48-port managed PoE switch",category: "Electronics",      supplier: "Cisco Systems",         quantity: 4,    unit: "units",     unitPrice: 62000,emission: 200,  emissionLow: 168,   emissionHigh: 232,   confidence: 84, date: "2024-12-05", source: "Invoice #CSC-1801" },
  { id: 27, description: "Denim yarn — indigo dyed",        category: "Textiles",         supplier: "Arvind Mills",          quantity: 300,  unit: "kg",        unitPrice: 40,   emission: 4500, emissionLow: 3600,  emissionHigh: 5400,  confidence: 79, date: "2024-12-06", source: "Invoice #ARV-5621" },
  { id: 28, description: "Propane canisters (industrial)",  category: "Energy",           supplier: "Bharat Petroleum",      quantity: 120,  unit: "canisters", unitPrice: 890,  emission: 321.6,emissionLow: 305.5, emissionHigh: 337.7, confidence: 93, date: "2024-12-07", source: "Invoice #BPCL-0442" },
  { id: 29, description: "Fertiliser — NPK 20:20:20",      category: "Food & Agriculture",supplier: "Coromandel Int'l",     quantity: 1000, unit: "kg",        unitPrice: 32,   emission: 3500, emissionLow: 2730,  emissionHigh: 4270,  confidence: 74, date: "2024-12-08", source: "PO-AG-0012" },
  { id: 30, description: "HP LaserJet M428 printers",       category: "Electronics",      supplier: "HP India",              quantity: 3,    unit: "units",     unitPrice: 35000,emission: 150,  emissionLow: 126,   emissionHigh: 174,   confidence: 86, date: "2024-12-09", source: "Invoice #HP-3320" },
];

export const pipelineSteps: PipelineStep[] = [
  { label: "Ingestion",      icon: "upload",      status: "completed", duration: "1.2s" },
  { label: "OCR / Parse",    icon: "file-search",  status: "completed", duration: "3.8s" },
  { label: "NLP Extract",    icon: "brain",        status: "completed", duration: "2.1s" },
  { label: "Classify",       icon: "git-branch",   status: "active",    duration: "—" },
  { label: "Factor Lookup",  icon: "calculator",   status: "pending" },
  { label: "Report",         icon: "file-output",  status: "pending" },
];

export const insights: InsightItem[] = [
  { text: "Plastics contribute 42% of total Scope 3 — consider bio-based alternatives from certified suppliers.", type: "warning" },
  { text: "4 items below 80% confidence. Manual category review recommended before final report.", type: "warning" },
  { text: "Transport emissions dropped 18% quarter-over-quarter after switching to consolidated freight.", type: "success" },
  { text: "Consolidating 3 metal suppliers into 1 regional vendor could save ~45 tCO₂e per year.", type: "info" },
  { text: "Cloud compute emissions (58 kg) are low but growing 30% MoM — track going forward.", type: "info" },
  { text: "Energy category (diesel + gas + propane) accounts for 10,506 kg — largest single block. Electrification roadmap advised.", type: "warning" },
  { text: "Textile emissions at 9,750 kg are significant. Switching to recycled polyester could cut by ~40%.", type: "info" },
  { text: "Food & Agriculture uncertainty range is widest (±22%). Supplier-specific data would improve accuracy.", type: "warning" },
];

export const categoryBreakdown = [
  { name: "Metals",             value: 5650,  fill: "#6366f1" },
  { name: "Plastics",           value: 5580,  fill: "#f43f5e" },
  { name: "Transport",          value: 90,    fill: "#f59e0b" },
  { name: "Electronics",        value: 4100,  fill: "#06b6d4" },
  { name: "Office Supplies",    value: 340,   fill: "#22c55e" },
  { name: "Energy",             value: 10506, fill: "#ef4444" },
  { name: "Chemicals",          value: 966,   fill: "#a855f7" },
  { name: "Textiles",           value: 9750,  fill: "#ec4899" },
  { name: "Food & Agriculture", value: 6650,  fill: "#14b8a6" },
  { name: "Other",              value: 68,    fill: "#94a3b8" },
];

export const monthlyTrend = [
  { month: "Jan",  emissions: 7200 },
  { month: "Feb",  emissions: 7800 },
  { month: "Mar",  emissions: 8500 },
  { month: "Apr",  emissions: 8100 },
  { month: "May",  emissions: 9200 },
  { month: "Jun",  emissions: 9800 },
  { month: "Jul",  emissions: 10400 },
  { month: "Aug",  emissions: 11200 },
  { month: "Sep",  emissions: 10900 },
  { month: "Oct",  emissions: 11800 },
  { month: "Nov",  emissions: 12594 },
  { month: "Dec",  emissions: 13700 },
];

export const supplierRanking = [
  { name: "Arvind Mills",          emissions: 7500,  items: 2, category: "Textiles" },
  { name: "GAIL India",            emissions: 8040,  items: 1, category: "Energy" },
  { name: "Sundram Fasteners",     emissions: 5000,  items: 1, category: "Metals" },
  { name: "Freudenberg Sealing",   emissions: 3100,  items: 1, category: "Plastics" },
  { name: "Coromandel Int'l",      emissions: 3500,  items: 1, category: "Food & Agriculture" },
  { name: "Lenovo India",          emissions: 2500,  items: 1, category: "Electronics" },
  { name: "Indian Oil Corp",       emissions: 2144,  items: 1, category: "Energy" },
  { name: "Reliance Polymers",     emissions: 1550,  items: 1, category: "Plastics" },
  { name: "Local Agri Co-op",      emissions: 1750,  items: 1, category: "Food & Agriculture" },
  { name: "Dell Technologies",     emissions: 1250,  items: 1, category: "Electronics" },
];

export const metrics = {
  totalEmissions: 43700,
  avgConfidence: 84,
  itemsProcessed: 30,
  highRiskItems: 8,
  suppliersTracked: 24,
  documentsIngested: 30,
};
