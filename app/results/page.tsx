'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  alpha,
  LinearProgress,
  Divider,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { ThemeToggle } from '@/components/ThemeToggle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { calculateOverallScore, type BusinessInputs } from '@/lib/scoring';
import { analyzeBusinessWithAI, type AIAnalysisResult } from '@/lib/aiScoring';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Results() {
  const theme = useTheme();
  const [aiAnalysis, setAiAnalysis] = React.useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const sampleInputs: BusinessInputs = {
    // Market Analysis Inputs
    marketSize: 5,              // 5 ล้านบาทต่อปี
    competitorCount: 3,         // 3 ร้านในรัศมี 1 กิโลเมตร
    targetCustomerCount: 500,   // 500 คนต่อวัน
    locationScore: 8,           // คะแนนทำเล 8/10
    
    // Financial Inputs
    initialInvestment: 500000,  // เงินลงทุน 500,000 บาท
    monthlyRevenue: 150000,     // รายได้ 150,000 บาทต่อเดือน
    monthlyCost: 90000,         // ต้นทุน 90,000 บาทต่อเดือน
    breakEvenMonths: 8.33,      // คืนทุนใน 8.33 เดือน
    
    // Operational Inputs
    staffCount: 4,              // พนักงาน 4 คน
    openingHours: 12,           // เปิด 12 ชั่วโมงต่อวัน
    menuItems: 15,              // 15 รายการในเมนู
    equipmentQuality: 8,        // คะแนนอุปกรณ์ 8/10
  };

  const scores = calculateOverallScore(sampleInputs);
  
  React.useEffect(() => {
    const fetchAIAnalysis = async () => {
      try {
        const analysis = await analyzeBusinessWithAI(sampleInputs, {
          marketScore: scores.marketScore,
          financialScore: scores.financialScore,
          operationalScore: scores.operationalScore
        });
        setAiAnalysis(analysis);
      } catch (error) {
        console.error('Error fetching AI analysis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIAnalysis();
  }, []);

  const [mockData, setMockData] = React.useState({
    businessName: 'ร้านกาแฟสดพรีเมียม',
    investmentAmount: sampleInputs.initialInvestment,
    monthlyRevenue: sampleInputs.monthlyRevenue,
    monthlyCost: sampleInputs.monthlyCost,
    monthlyProfit: sampleInputs.monthlyRevenue - sampleInputs.monthlyCost,
    breakEvenMonths: sampleInputs.breakEvenMonths,
    roi: ((sampleInputs.monthlyRevenue - sampleInputs.monthlyCost) / sampleInputs.initialInvestment) * 100,
    marketScore: aiAnalysis?.adjustedScores.marketScore ?? scores.marketScore,
    financialScore: aiAnalysis?.adjustedScores.financialScore ?? scores.financialScore,
    operationalScore: aiAnalysis?.adjustedScores.operationalScore ?? scores.operationalScore,
    overallScore: Math.round(
      ((aiAnalysis?.adjustedScores.marketScore ?? scores.marketScore) * 0.35) +
      ((aiAnalysis?.adjustedScores.financialScore ?? scores.financialScore) * 0.40) +
      ((aiAnalysis?.adjustedScores.operationalScore ?? scores.operationalScore) * 0.25)
    ),
  });

  // Monthly projection data
  const monthlyData = {
    labels: ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'],
    datasets: [
      {
        label: 'รายรับ',
        data: Array(12).fill().map((_, i) => mockData.monthlyRevenue * (1 + i * 0.05)),
        borderColor: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.1),
        fill: true,
      },
      {
        label: 'รายจ่าย',
        data: Array(12).fill().map((_, i) => mockData.monthlyCost * (1 + i * 0.03)),
        borderColor: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.1),
        fill: true,
      },
    ],
  };

  // Score breakdown data
  const scoreData: ChartData<'doughnut'> = {
    labels: ['การตลาด', 'การเงิน', 'การดำเนินงาน'],
    datasets: [
      {
        data: [mockData.marketScore, mockData.financialScore, mockData.operationalScore],
        backgroundColor: [
          alpha(theme.palette.primary.main, 0.8),
          alpha(theme.palette.secondary.main, 0.8),
          alpha(theme.palette.success.main, 0.8),
        ],
        borderColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
        ],
        borderWidth: 1,
      },
    ],
  };

  // ROI Projection data
  const roiData: ChartData<'bar'> = {
    labels: ['ปีที่ 1', 'ปีที่ 2', 'ปีที่ 3'],
    datasets: [
      {
        label: 'ผลตอบแทนการลงทุน (%)',
        data: [mockData.roi, mockData.roi * 1.5, mockData.roi * 2],
        backgroundColor: alpha(theme.palette.primary.main, 0.8),
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: true,
      },
      title: {
        display: true,
        text: 'Financial Projections',
        color: theme.palette.common.white,
      },
    },
    scales: {
      x: {
        grid: {
          color: alpha(theme.palette.common.white, 0.15),
        },
        ticks: {
          color: theme.palette.common.white,
        },
      },
      y: {
        grid: {
          color: alpha(theme.palette.common.white, 0.15),
        },
        ticks: {
          color: theme.palette.common.white,
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: true,
      },
      title: {
        display: true,
        text: 'ROI Projections',
        color: theme.palette.common.white,
      },
    },
    scales: {
      x: {
        grid: {
          color: alpha(theme.palette.common.white, 0.15),
        },
        ticks: {
          color: theme.palette.common.white,
        },
      },
      y: {
        grid: {
          color: alpha(theme.palette.common.white, 0.15),
        },
        ticks: {
          color: theme.palette.common.white,
        },
      },
    },
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(159, 122, 234, 0.3)',
            }}
          >
            ผลการวิเคราะห์ธุรกิจ
          </Typography>
          <ThemeToggle />
        </Box>

        {/* Overall Score */}
        <Card
          sx={{
            mb: 4,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                  {mockData.businessName}
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  คะแนนรวมการประเมิน
                </Typography>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={mockData.overallScore}
                    sx={{
                      height: 20,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                    }}
                  >
                    {mockData.overallScore}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: 200 }}>
                  <Typography variant="h6" gutterBottom>
                    Score Breakdown
                  </Typography>
                  <Doughnut data={scoreData} options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }} />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Financial Projections */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.3)})`,
                    }}
                  >
                    <TimelineIcon sx={{ color: theme.palette.primary.main }} />
                  </Box>
                }
                title={
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    การคาดการณ์รายรับ-รายจ่าย 12 เดือน
                  </Typography>
                }
              />
              <CardContent>
                <Box sx={{ height: 300, p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Financial Projections
                  </Typography>
                  <Line options={lineChartOptions} data={monthlyData} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* ROI Projection */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
                    }}
                  >
                    <TrendingUpIcon sx={{ color: theme.palette.secondary.main }} />
                  </Box>
                }
                title={
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    ผลตอบแทนการลงทุน (ROI)
                  </Typography>
                }
              />
              <CardContent>
                <Box sx={{ height: 250 }}>
                  <Bar
                    data={roiData}
                    options={barChartOptions}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Key Metrics */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.2)}, ${alpha(theme.palette.success.main, 0.3)})`,
                    }}
                  >
                    <AssessmentIcon sx={{ color: theme.palette.success.main }} />
                  </Box>
                }
                title={
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    ตัวชี้วัดสำคัญ
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      เงินลงทุนเริ่มต้น
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                      {mockData.investmentAmount.toLocaleString()} บาท
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      รายได้ต่อเดือน (เฉลี่ย)
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                      {mockData.monthlyRevenue.toLocaleString()} บาท
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      กำไรต่อเดือน (เฉลี่ย)
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                      {mockData.monthlyProfit.toLocaleString()} บาท
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      ระยะเวลาคืนทุน
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                      {Math.ceil(mockData.breakEvenMonths)} เดือน
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* AI Analysis Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    การวิเคราะห์เชิงลึกด้วย AI
                  </Typography>
                }
              />
              <CardContent>
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : aiAnalysis ? (
                  <Grid container spacing={3}>
                    {/* Recommendations */}
                    <Grid item xs={12} md={4}>
                      <Alert severity="info" sx={{ mb: 2, backgroundColor: 'rgba(2, 136, 209, 0.1)' }}>
                        <AlertTitle>คำแนะนำในการปรับปรุง</AlertTitle>
                        <List>
                          {aiAnalysis.recommendations.map((rec, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={rec} sx={{ color: 'white' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    </Grid>

                    {/* Risk Factors */}
                    <Grid item xs={12} md={4}>
                      <Alert severity="warning" sx={{ mb: 2, backgroundColor: 'rgba(237, 108, 2, 0.1)' }}>
                        <AlertTitle>ปัจจัยเสี่ยงที่ต้องระวัง</AlertTitle>
                        <List>
                          {aiAnalysis.riskFactors.map((risk, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={risk} sx={{ color: 'white' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    </Grid>

                    {/* Opportunities */}
                    <Grid item xs={12} md={4}>
                      <Alert severity="success" sx={{ mb: 2, backgroundColor: 'rgba(46, 125, 50, 0.1)' }}>
                        <AlertTitle>โอกาสในการเติบโต</AlertTitle>
                        <List>
                          {aiAnalysis.opportunities.map((opp, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={opp} sx={{ color: 'white' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    </Grid>
                  </Grid>
                ) : (
                  <Alert severity="error" sx={{ backgroundColor: 'rgba(211, 47, 47, 0.1)' }}>
                    <AlertTitle>ไม่สามารถวิเคราะห์ได้</AlertTitle>
                    เกิดข้อผิดพลาดในการวิเคราะห์ด้วย AI กรุณาลองใหม่อีกครั้ง
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 