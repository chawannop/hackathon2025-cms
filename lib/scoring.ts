// Types for scoring inputs
export interface BusinessInputs {
  // Market Analysis Inputs
  marketSize: number;              // ขนาดตลาดในพื้นที่ (ล้านบาท/ปี)
  competitorCount: number;         // จำนวนคู่แข่งในรัศมี 1 กิโลเมตร
  targetCustomerCount: number;     // จำนวนลูกค้ากลุ่มเป้าหมายในพื้นที่
  locationScore: number;          // คะแนนทำเลที่ตั้ง (1-10)
  
  // Financial Inputs
  initialInvestment: number;      // เงินลงทุนเริ่มต้น
  monthlyRevenue: number;         // รายได้ต่อเดือน
  monthlyCost: number;            // ต้นทุนต่อเดือน
  breakEvenMonths: number;        // ระยะเวลาคืนทุน (เดือน)
  
  // Operational Inputs
  staffCount: number;             // จำนวนพนักงาน
  openingHours: number;           // ชั่วโมงเปิดให้บริการต่อวัน
  menuItems: number;              // จำนวนรายการสินค้า/เมนู
  equipmentQuality: number;       // คะแนนคุณภาพอุปกรณ์ (1-10)
}

// Market Score Calculation (35% of total)
export function calculateMarketScore(inputs: BusinessInputs): number {
  const marketSizeScore = Math.min((inputs.marketSize / 10) * 100, 100) * 0.3;  // 30% weight
  const competitorScore = Math.max(100 - (inputs.competitorCount * 10), 0) * 0.25;  // 25% weight
  const customerBaseScore = Math.min((inputs.targetCustomerCount / 1000) * 100, 100) * 0.25;  // 25% weight
  const locationScore = (inputs.locationScore * 10) * 0.2;  // 20% weight

  return (marketSizeScore + competitorScore + customerBaseScore + locationScore);
}

// Financial Score Calculation (40% of total)
export function calculateFinancialScore(inputs: BusinessInputs): number {
  // ROI Score (Return on Investment monthly)
  const monthlyProfit = inputs.monthlyRevenue - inputs.monthlyCost;
  const monthlyROI = (monthlyProfit / inputs.initialInvestment) * 100;
  const roiScore = Math.min(monthlyROI * 10, 100) * 0.3;  // 30% weight

  // Break Even Score
  const breakEvenScore = Math.max(100 - (inputs.breakEvenMonths * 5), 0) * 0.3;  // 30% weight

  // Profit Margin Score
  const profitMargin = (monthlyProfit / inputs.monthlyRevenue) * 100;
  const profitMarginScore = Math.min(profitMargin * 2, 100) * 0.4;  // 40% weight

  return (roiScore + breakEvenScore + profitMarginScore);
}

// Operational Score Calculation (25% of total)
export function calculateOperationalScore(inputs: BusinessInputs): number {
  // Staff Efficiency Score
  const staffPerRevenue = inputs.monthlyRevenue / (inputs.staffCount * 15000); // เทียบกับเงินเดือนพนักงานเฉลี่ย
  const staffScore = Math.min(staffPerRevenue * 50, 100) * 0.25;  // 25% weight

  // Operating Hours Score
  const hoursScore = (inputs.openingHours / 12) * 100 * 0.25;  // 25% weight

  // Menu Variety Score
  const menuScore = Math.min((inputs.menuItems / 20) * 100, 100) * 0.25;  // 25% weight

  // Equipment Quality Score
  const equipmentScore = inputs.equipmentQuality * 10 * 0.25;  // 25% weight

  return (staffScore + hoursScore + menuScore + equipmentScore);
}

// Calculate Overall Score
export function calculateOverallScore(inputs: BusinessInputs): {
  marketScore: number;
  financialScore: number;
  operationalScore: number;
  overallScore: number;
} {
  const marketScore = calculateMarketScore(inputs);
  const financialScore = calculateFinancialScore(inputs);
  const operationalScore = calculateOperationalScore(inputs);

  // Weight distribution: Market (35%), Financial (40%), Operational (25%)
  const overallScore = (
    marketScore * 0.35 +
    financialScore * 0.40 +
    operationalScore * 0.25
  );

  return {
    marketScore: Math.round(marketScore),
    financialScore: Math.round(financialScore),
    operationalScore: Math.round(operationalScore),
    overallScore: Math.round(overallScore)
  };
} 