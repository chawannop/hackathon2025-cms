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
  IconButton,
} from '@mui/material';
import { ThemeToggle } from '@/components/ThemeToggle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
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
import { motion } from 'framer-motion';
import { LineChart, BarChart } from '@mui/x-charts';

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

// Define chart data types
interface MonthlyData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface MockData {
  businessName: string;
  description: string;
  targetUsers: string;
  solution: string;
  marketScore: number;
  financialScore: number;
  operationalScore: number;
  overallScore: number;
}


const sampleInputs: BusinessInputs = {
  // Business Information
  businessName: "Tech Startup Co.",
  description: "A technology company focused on innovative solutions",
  revenueModel: "Subscription-based SaaS model",

  // Target Users & Problems
  targetUsers: "Small to medium businesses",
  painPoint: "Inefficient business processes",
  solution: "Cloud-based management platform",

  // Business Strategy
  competitors: "Traditional software providers",
  usp: "User-friendly interface and AI-powered features",
  goToMarket: "Direct sales and partnerships",

  // Financial and Operations
  costStructure: "Cloud infrastructure and development costs",
  breakEvenPoint: "12 months with 1000 subscribers",
  keyMetrics: "Monthly recurring revenue, churn rate",
  resourcesNeeded: "Development team, sales team, marketing budget"
};


export default function Results() {
  const theme = useTheme();
  const router = useRouter();
  const [aiAnalysis, setAiAnalysis] = React.useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const initialScores = calculateOverallScore(sampleInputs);
  const [scores, setScores] = React.useState(initialScores);
  const [mockData, setMockData] = React.useState<MockData>({
    businessName: sampleInputs.businessName,
    description: sampleInputs.description,
    targetUsers: sampleInputs.targetUsers,
    solution: sampleInputs.solution,
    marketScore: initialScores.marketScore,
    financialScore: initialScores.financialScore,
    operationalScore: initialScores.operationalScore,
    overallScore: Math.round(
      (initialScores.marketScore * 0.35) +
      (initialScores.financialScore * 0.40) +
      (initialScores.operationalScore * 0.25)
    ),
  });

  React.useEffect(() => {
    const fetchAIAnalysis = async () => {
      try {
        const analysis = await analyzeBusinessWithAI(sampleInputs, {
          marketScore: scores.marketScore,
          financialScore: scores.financialScore,
          operationalScore: scores.operationalScore
        });
        setAiAnalysis(analysis);
        if (analysis?.adjustedScores) {
          setMockData(prev => ({
            ...prev,
            marketScore: analysis.adjustedScores.marketScore,
            financialScore: analysis.adjustedScores.financialScore,
            operationalScore: analysis.adjustedScores.operationalScore,
            overallScore: Math.round(
              (analysis.adjustedScores.marketScore * 0.35) +
              (analysis.adjustedScores.financialScore * 0.40) +
              (analysis.adjustedScores.operationalScore * 0.25)
            ),
          }));
        }
      } catch (error) {
        console.error('Error fetching AI analysis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIAnalysis();


    console.log("=====sampleInputs", sampleInputs);
  }, [sampleInputs]);

  // Monthly projection data
  const monthlyData: MonthlyData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    datasets: [
      {
        label: 'คะแนนการตลาด',
        data: [60, 65, 70, 75, 80, 85],
      },
      {
        label: 'คะแนนการเงิน',
        data: [55, 60, 65, 70, 75, 80],
      },
      {
        label: 'คะแนนการดำเนินงาน',
        data: [50, 55, 60, 65, 70, 75],
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
    labels: ['การตลาด', 'การเงิน', 'การดำเนินงาน'],
    datasets: [
      {
        label: 'คะแนน',
        data: [mockData.marketScore, mockData.financialScore, mockData.operationalScore],
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
        text: 'แนวโน้มคะแนน',
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
        text: 'คะแนนในแต่ละด้าน',
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={() => router.push('/')}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
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
                ผลการประเมิน
              </Typography>
            </Box>
            <ThemeToggle />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
              textAlign: 'center'
            }}
          >
            {mockData.businessName}
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card
            sx={{
              mb: 4,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <AssessmentIcon />
                    คะแนนรวมการประเมิน
                  </Typography>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={mockData.overallScore}
                      sx={{
                        height: 24,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          transition: 'transform 1s ease-in-out',
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
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {mockData.overallScore}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ height: 200 }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Doughnut data={scoreData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: 'rgba(255,255,255,0.8)',
                              font: {
                                size: 12
                              }
                            }
                          }
                        }
                      }} />
                    </motion.div>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    คำอธิบายคะแนน
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 2,
                    height: '100%',
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, mb: 2, fontWeight: 'bold' }}>
                        ด้านการตลาด (35%)
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 2 }}>
                        • ขนาดตลาด (30%)<br />
                        • จำนวนคู่แข่ง (25%)<br />
                        • ฐานลูกค้าเป้าหมาย (25%)<br />
                        • คะแนนทำเลที่ตั้ง (20%)
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 2, textAlign: 'right', borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', pt: 2 }}>
                      รวม: {mockData.marketScore}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    borderRadius: 2,
                    height: '100%',
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, mb: 2, fontWeight: 'bold' }}>
                        ด้านการเงิน (40%)
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 2 }}>
                        • ผลตอบแทนการลงทุนรายเดือน (30%)<br />
                        • ระยะเวลาคืนทุน (30%)<br />
                        • อัตรากำไร (40%)
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: theme.palette.secondary.main, mt: 2, textAlign: 'right', borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', pt: 2 }}>
                      รวม: {mockData.financialScore}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    borderRadius: 2,
                    height: '100%',
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: theme.palette.success.main, mb: 2, fontWeight: 'bold' }}>
                        ด้านการดำเนินงาน (25%)
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 2 }}>
                        • ประสิทธิภาพพนักงาน (25%)<br />
                        • ชั่วโมงการทำงาน (25%)<br />
                        • ความหลากหลายของเมนู (25%)<br />
                        • คุณภาพอุปกรณ์ (25%)
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: theme.palette.success.main, mt: 2, textAlign: 'right', borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', pt: 2 }}>
                      รวม: {mockData.operationalScore}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
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
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <LineChart
                        xAxis={[{
                          data: monthlyData.labels,
                          scaleType: 'band',
                        }]}
                        yAxis={[{
                          min: 0,
                          max: Math.max(...monthlyData.datasets[0].data) * 1.2,
                        }]}
                        series={[
                          {
                            data: monthlyData.datasets[0].data,
                            label: monthlyData.datasets[0].label,
                            color: theme.palette.primary.main,
                          },
                          {
                            data: monthlyData.datasets[1].data,
                            label: monthlyData.datasets[1].label,
                            color: theme.palette.secondary.main,
                          },
                          {
                            data: monthlyData.datasets[2].data,
                            label: monthlyData.datasets[2].label,
                            color: theme.palette.success.main,
                          }
                        ]}
                        height={300}
                        width={600}
                      />
                    </motion.div>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* ROI Projection */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
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
                    <BarChart
                      xAxis={[{
                        data: ['ด้านการเงิน', 'ด้านการตลาด', 'ด้านการดำเนินงาน', 'ด้านความเสี่ยง'],
                        scaleType: 'band',
                      }]}
                      yAxis={[{
                        min: 0,
                        max: 100,
                      }]}
                      series={[{
                        data: [mockData.financialScore, mockData.marketScore, mockData.operationalScore, 0],
                        color: theme.palette.primary.main,
                      }]}
                      height={300}
                      width={600}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Key Metrics */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
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
                      ข้อมูลการเงินและการดำเนินงาน
                    </Typography>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        รูปแบบรายได้
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {sampleInputs.revenueModel}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        โครงสร้างต้นทุน
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {sampleInputs.costStructure}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        จุดคุ้มทุน
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {sampleInputs.breakEvenPoint}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        ตัวชี้วัดสำคัญ
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {sampleInputs.keyMetrics}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* AI Analysis Section with animations */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
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
        </motion.div>

        {/* Score Explanation Card */}
        <Grid item xs={12}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    วิธีการคำนวณคะแนน
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      ด้านการตลาด (35%)
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      • ขนาดตลาด (30%)<br />
                      • จำนวนคู่แข่ง (25%)<br />
                      • ฐานลูกค้าเป้าหมาย (25%)<br />
                      • คะแนนทำเลที่ตั้ง (20%)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      ด้านการเงิน (40%)
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      • ผลตอบแทนการลงทุนรายเดือน (30%)<br />
                      • ระยะเวลาคืนทุน (30%)<br />
                      • อัตรากำไร (40%)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      ด้านการดำเนินงาน (25%)
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      • ประสิทธิภาพพนักงาน (25%)<br />
                      • ชั่วโมงการทำงาน (25%)<br />
                      • ความหลากหลายของเมนู (25%)<br />
                      • คุณภาพอุปกรณ์ (25%)
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Container>
    </Box>
  );
} 