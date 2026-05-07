export type MedicineStatus = 'safe' | 'warning' | 'critical';

export interface Medicine {
  id: string;
  name: string;
  batch: string;
  quantity: number;
  expiryDate: string;
  category: string;
  supplier: string;
  price: number;
  status: MedicineStatus;
  location: string;
}

export interface Alert {
  id: string;
  type: 'expiry' | 'low_stock' | 'demand' | 'redistribution';
  message: string;
  severity: 'info' | 'warning' | 'critical';
  time: string;
}

export interface ForecastData {
  month: string;
  actual?: number;
  predicted: number;
}

export interface RedistributionSuggestion {
  id: string;
  medicine: string;
  from: string;
  to: string;
  quantity: number;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
}

export const medicines: Medicine[] = [
  { id: 'm1', name: 'Amoxicillin 500mg', batch: 'B2024-001', quantity: 1240, expiryDate: '2025-11-15', category: 'Antibiotics', supplier: 'PharmaCo', price: 12.5, status: 'safe', location: 'Warehouse A' },
  { id: 'm2', name: 'Metformin 850mg', batch: 'B2024-002', quantity: 85, expiryDate: '2025-02-20', category: 'Antidiabetic', supplier: 'MedSupply', price: 8.75, status: 'critical', location: 'Warehouse B' },
  { id: 'm3', name: 'Atorvastatin 20mg', batch: 'B2024-003', quantity: 320, expiryDate: '2025-04-10', category: 'Cardiovascular', supplier: 'HealthPlus', price: 22.0, status: 'warning', location: 'Warehouse A' },
  { id: 'm4', name: 'Omeprazole 20mg', batch: 'B2024-004', quantity: 2100, expiryDate: '2026-01-30', category: 'Gastrointestinal', supplier: 'PharmaCo', price: 6.5, status: 'safe', location: 'Warehouse C' },
  { id: 'm5', name: 'Lisinopril 10mg', batch: 'B2024-005', quantity: 45, expiryDate: '2025-03-05', category: 'Cardiovascular', supplier: 'CardioMed', price: 15.25, status: 'critical', location: 'Warehouse B' },
  { id: 'm6', name: 'Cetirizine 10mg', batch: 'B2024-006', quantity: 780, expiryDate: '2025-08-22', category: 'Antihistamine', supplier: 'AllergyFree', price: 4.0, status: 'safe', location: 'Warehouse A' },
  { id: 'm7', name: 'Paracetamol 500mg', batch: 'B2024-007', quantity: 3200, expiryDate: '2026-06-15', category: 'Analgesics', supplier: 'PharmaCo', price: 2.5, status: 'safe', location: 'Warehouse A' },
  { id: 'm8', name: 'Ibuprofen 400mg', batch: 'B2024-008', quantity: 150, expiryDate: '2025-04-28', category: 'Analgesics', supplier: 'MedSupply', price: 5.0, status: 'warning', location: 'Warehouse C' },
  { id: 'm9', name: 'Azithromycin 250mg', batch: 'B2024-009', quantity: 60, expiryDate: '2025-03-18', category: 'Antibiotics', supplier: 'PharmaCo', price: 18.0, status: 'critical', location: 'Warehouse B' },
  { id: 'm10', name: 'Pantoprazole 40mg', batch: 'B2024-010', quantity: 540, expiryDate: '2025-09-12', category: 'Gastrointestinal', supplier: 'GastroMed', price: 11.0, status: 'safe', location: 'Warehouse A' },
  { id: 'm11', name: 'Amlodipine 5mg', batch: 'B2024-011', quantity: 210, expiryDate: '2025-05-30', category: 'Cardiovascular', supplier: 'CardioMed', price: 9.5, status: 'warning', location: 'Warehouse C' },
  { id: 'm12', name: 'Levothyroxine 50mcg', batch: 'B2024-012', quantity: 890, expiryDate: '2026-03-20', category: 'Hormones', supplier: 'HealthPlus', price: 14.0, status: 'safe', location: 'Warehouse B' },
];

export const alerts: Alert[] = [
  { id: 'a1', type: 'expiry', message: 'Metformin 850mg (Batch B2024-002) expires in 18 days', severity: 'critical', time: '2 min ago' },
  { id: 'a2', type: 'low_stock', message: 'Lisinopril 10mg stock critically low (45 units)', severity: 'critical', time: '15 min ago' },
  { id: 'a3', type: 'expiry', message: 'Azithromycin 250mg expires in 26 days', severity: 'warning', time: '1 hr ago' },
  { id: 'a4', type: 'demand', message: 'High demand predicted for Paracetamol next week (+40%)', severity: 'info', time: '3 hr ago' },
  { id: 'a5', type: 'redistribution', message: 'Surplus Omeprazole at Warehouse C — suggest transfer', severity: 'info', time: '5 hr ago' },
];

export const demandTrendData = [
  { month: 'Jul', paracetamol: 3200, antibiotics: 1800, cardiovascular: 950 },
  { month: 'Aug', paracetamol: 2900, antibiotics: 2100, cardiovascular: 1020 },
  { month: 'Sep', paracetamol: 3100, antibiotics: 1950, cardiovascular: 1100 },
  { month: 'Oct', paracetamol: 3400, antibiotics: 2300, cardiovascular: 980 },
  { month: 'Nov', paracetamol: 3800, antibiotics: 2800, cardiovascular: 1150 },
  { month: 'Dec', paracetamol: 4200, antibiotics: 3100, cardiovascular: 1300 },
  { month: 'Jan', paracetamol: 3900, antibiotics: 2600, cardiovascular: 1250 },
];

export const categoryDistribution = [
  { name: 'Antibiotics', value: 28, color: '#4f6ef7' },
  { name: 'Cardiovascular', value: 22, color: '#7c3aed' },
  { name: 'Analgesics', value: 18, color: '#06b6d4' },
  { name: 'Gastrointestinal', value: 15, color: '#10b981' },
  { name: 'Antidiabetic', value: 10, color: '#f59e0b' },
  { name: 'Others', value: 7, color: '#94a3b8' },
];

export const forecastData: Record<string, ForecastData[]> = {
  'Paracetamol 500mg': [
    { month: 'Oct', actual: 3400, predicted: 3350 },
    { month: 'Nov', actual: 3800, predicted: 3820 },
    { month: 'Dec', actual: 4200, predicted: 4100 },
    { month: 'Jan', actual: 3900, predicted: 3950 },
    { month: 'Feb', predicted: 4300 },
    { month: 'Mar', predicted: 4600 },
    { month: 'Apr', predicted: 4200 },
  ],
  'Amoxicillin 500mg': [
    { month: 'Oct', actual: 1100, predicted: 1080 },
    { month: 'Nov', actual: 1350, predicted: 1300 },
    { month: 'Dec', actual: 1600, predicted: 1580 },
    { month: 'Jan', actual: 1400, predicted: 1420 },
    { month: 'Feb', predicted: 1550 },
    { month: 'Mar', predicted: 1700 },
    { month: 'Apr', predicted: 1480 },
  ],
  'Metformin 850mg': [
    { month: 'Oct', actual: 820, predicted: 800 },
    { month: 'Nov', actual: 890, predicted: 870 },
    { month: 'Dec', actual: 950, predicted: 940 },
    { month: 'Jan', actual: 910, predicted: 920 },
    { month: 'Feb', predicted: 980 },
    { month: 'Mar', predicted: 1020 },
    { month: 'Apr', predicted: 960 },
  ],
  'Atorvastatin 20mg': [
    { month: 'Oct', actual: 640, predicted: 620 },
    { month: 'Nov', actual: 700, predicted: 690 },
    { month: 'Dec', actual: 750, predicted: 740 },
    { month: 'Jan', actual: 720, predicted: 730 },
    { month: 'Feb', predicted: 780 },
    { month: 'Mar', predicted: 820 },
    { month: 'Apr', predicted: 760 },
  ],
};

export const redistributionSuggestions: RedistributionSuggestion[] = [
  { id: 'r1', medicine: 'Omeprazole 20mg', from: 'Warehouse C', to: 'Warehouse B', quantity: 500, reason: 'Surplus at C, shortage predicted at B within 2 weeks', urgency: 'medium' },
  { id: 'r2', medicine: 'Paracetamol 500mg', from: 'Warehouse A', to: 'Warehouse C', quantity: 800, reason: 'High demand forecast at C for next month', urgency: 'low' },
  { id: 'r3', medicine: 'Metformin 850mg', from: 'Warehouse B', to: 'Warehouse A', quantity: 40, reason: 'Critical low stock at A, expiry risk at B', urgency: 'high' },
  { id: 'r4', medicine: 'Cetirizine 10mg', from: 'Warehouse A', to: 'Warehouse B', quantity: 200, reason: 'Seasonal allergy spike predicted at B location', urgency: 'medium' },
];

export const kpiData = {
  totalInventory: { value: 12840, change: +8.2, unit: 'units' },
  expiringSoon: { value: 3, change: -1, unit: 'medicines' },
  demandAccuracy: { value: 94.7, change: +2.1, unit: '%' },
  wasteSaved: { value: 18420, change: +12.5, unit: 'USD' },
};
