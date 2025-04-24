// Types for scoring inputs
export interface BusinessInputs {
  // Business Information
  businessName: string;           // ชื่อธุรกิจ
  description: string;            // คำอธิบายธุรกิจ
  revenueModel: string;          // รูปแบบรายได้

  // Target Users & Problems
  targetUsers: string;           // กลุ่มเป้าหมาย
  painPoint: string;             // ปัญหาที่พบ
  solution: string;              // วิธีแก้ปัญหา

  // Business Strategy
  competitors: string;           // คู่แข่ง
  usp: string;                  // จุดเด่นของธุรกิจ
  goToMarket: string;           // แผนการเข้าสู่ตลาด

  // Financial and Operations
  costStructure: string;        // โครงสร้างต้นทุน
  breakEvenPoint: string;       // จุดคุ้มทุน
  keyMetrics: string;           // ตัวชี้วัดสำคัญ
  resourcesNeeded: string;      // ทรัพยากรที่ต้องการ
}

// Market Score Calculation (35% of total)
export function calculateMarketScore(inputs: BusinessInputs): number {
  // Score based on target users and market understanding
  const targetUsersScore = inputs.targetUsers ? 30 : 0;
  
  // Score based on solution and pain point analysis
  const solutionScore = inputs.solution ? 30 : 0;
  
  // Score based on competitors and market positioning
  const competitorsScore = inputs.competitors ? 20 : 0;
  
  // Score based on USP and market differentiation
  const uspScore = inputs.usp ? 20 : 0;

  return (targetUsersScore + solutionScore + competitorsScore + uspScore);
}

// Financial Score Calculation (40% of total)
export function calculateFinancialScore(inputs: BusinessInputs): number {
  // Score based on revenue model
  const revenueModelScore = inputs.revenueModel ? 30 : 0;
  
  // Score based on cost structure
  const costStructureScore = inputs.costStructure ? 30 : 0;
  
  // Score based on break even point
  const breakEvenScore = inputs.breakEvenPoint ? 20 : 0;
  
  // Score based on key metrics
  const metricsScore = inputs.keyMetrics ? 20 : 0;

  return (revenueModelScore + costStructureScore + breakEvenScore + metricsScore);
}

// Operational Score Calculation (25% of total)
export function calculateOperationalScore(inputs: BusinessInputs): number {
  // Score based on go-to-market strategy
  const goToMarketScore = inputs.goToMarket ? 40 : 0;
  
  // Score based on resources needed
  const resourcesScore = inputs.resourcesNeeded ? 30 : 0;
  
  // Score based on overall business description
  const descriptionScore = inputs.description ? 30 : 0;

  return (goToMarketScore + resourcesScore + descriptionScore);
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