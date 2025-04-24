'use client';

import React, { useState } from 'react';
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
  Button,
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
import { MarkdownViewer } from '@/components/MarkdownViewer';

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

interface FormData {
  name: string;
  description: string;
  targetUsers: string;
  solution: string;
  revenueModel: string;
  costStructure: string;
  breakEvenPoint: string;
  keyMetrics: string;
}

export default function Results() {
  const theme = useTheme();
  const router = useRouter();
  const [aiAnalysis, setAiAnalysis] = React.useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [formData, setFormData] = React.useState<BusinessInputs | null>(null);
  const [scores, setScores] = React.useState({
    marketScore: 0,
    financialScore: 0,
    operationalScore: 0
  });
  const [mockData, setMockData] = React.useState<MockData>({
    businessName: '',
    description: '',
    targetUsers: '',
    solution: '',
    marketScore: 0,
    financialScore: 0,
    operationalScore: 0,
    overallScore: 0
  });

  // Load form data from localStorage
  React.useEffect(() => {
    const savedData = localStorage.getItem('businessEvaluationForm');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
        // Don't redirect, just show error state
        setIsLoading(false);
      }
    } else {
      // Don't redirect, just show error state
      setIsLoading(false);
    }
  }, []);

  // Calculate scores when form data is loaded
  React.useEffect(() => {
    if (formData) {
      setIsLoading(true);
      const calculatedScores = calculateOverallScore(formData);
      setScores(calculatedScores);
      setMockData({
        businessName: formData.businessName,
        description: formData.description,
        targetUsers: formData.targetUsers,
        solution: formData.solution,
        marketScore: calculatedScores.marketScore,
        financialScore: calculatedScores.financialScore,
        operationalScore: calculatedScores.operationalScore,
        overallScore: Math.round(
          (calculatedScores.marketScore * 0.35) +
          (calculatedScores.financialScore * 0.40) +
          (calculatedScores.operationalScore * 0.25)
        ),
      });

      // Fetch AI analysis
      const fetchAIAnalysis = async () => {
        try {
          const analysis = await analyzeBusinessWithAI(formData, calculatedScores);
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
    }
  }, [formData]);

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
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              gap: 3
            }}
          >
            <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
              กำลังวิเคราะห์ข้อมูล...
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูลและให้คำแนะนำ
            </Typography>
          </Box>
        ) : !formData ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              gap: 3
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
              ไม่พบข้อมูลการประเมิน
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/evaluate')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                },
              }}
            >
              เริ่มประเมินธุรกิจ
            </Button>
          </Box>
        ) : (
          <>
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
                      <Box sx={{ height: 200, width: '100%', position: 'relative' }}>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          style={{ width: '100%', height: '100%' }}
                        >
                          <Doughnut 
                            data={scoreData} 
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: 'bottom',
                                  labels: {
                                    color: 'rgba(255,255,255,0.8)',
                                    font: {
                                      size: 12
                                    },
                                    padding: 20
                                  }
                                }
                              }
                            }} 
                          />
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

            <Grid container spacing={4} sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
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
                      <Box sx={{ height: 300, width: '100%', position: 'relative' }}>
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          style={{ width: '100%', height: '100%' }}
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
                            sx={{
                              '.MuiChartsAxis-label': {
                                fill: 'white',
                              },
                              '.MuiChartsAxis-tick': {
                                fill: 'white',
                              },
                              '.MuiChartsLegend-label': {
                                fill: 'white',
                              }
                            }}
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
                      <Box sx={{ height: 250, width: '100%', position: 'relative' }}>
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
                          height={250}
                          sx={{
                            '.MuiChartsAxis-label': {
                              fill: 'white',
                            },
                            '.MuiChartsAxis-tick': {
                              fill: 'white',
                            },
                            '.MuiChartsLegend-label': {
                              fill: 'white',
                            }
                          }}
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
                          คำแนะนำในการดำเนินงาน
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Grid container spacing={2} sx={{ height: '400px', overflow: 'auto' }}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1,
                            py: 1
                          }}>
                            รูปแบบรายได้ที่แนะนำ
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
                            {formData?.revenueModel ? (
                              <>
                                <strong>รูปแบบปัจจุบัน:</strong>
                                <MarkdownViewer content={formData.revenueModel} />
                                <strong>คำแนะนำ:</strong> พิจารณาเพิ่มช่องทางรายได้เสริม เช่น:
                                <ul>
                                  <li>บริการเสริมที่เกี่ยวข้อง</li>
                                  <li>แพ็คเกจพิเศษสำหรับลูกค้าประจำ</li>
                                  <li>การขายสินค้าที่เกี่ยวข้อง</li>
                                </ul>
                              </>
                            ) : 'ไม่พบข้อมูล'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1,
                            py: 1
                          }}>
                            การจัดการต้นทุน
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
                            {formData?.costStructure ? (
                              <>
                                <strong>โครงสร้างปัจจุบัน:</strong>
                                <MarkdownViewer content={formData.costStructure} />
                                <strong>คำแนะนำ:</strong>
                                <ul>
                                  <li>วิเคราะห์ต้นทุนแปรผันและต้นทุนคงที่</li>
                                  <li>หาพาร์ทเนอร์เพื่อลดต้นทุนการดำเนินงาน</li>
                                  <li>พิจารณาใช้เทคโนโลยีเพื่อเพิ่มประสิทธิภาพ</li>
                                </ul>
                              </>
                            ) : 'ไม่พบข้อมูล'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1,
                            py: 1
                          }}>
                            การวางแผนจุดคุ้มทุน
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
                            {formData?.breakEvenPoint ? (
                              <>
                                <strong>จุดคุ้มทุนปัจจุบัน:</strong>
                                <MarkdownViewer content={formData.breakEvenPoint} />
                                <strong>คำแนะนำ:</strong>
                                <ul>
                                  <li>ตั้งเป้าหมายยอดขายต่อเดือนให้ชัดเจน</li>
                                  <li>วางแผนการตลาดเพื่อเร่งการเข้าถึงจุดคุ้มทุน</li>
                                  <li>พิจารณาลดต้นทุนเพื่อลดระยะเวลาถึงจุดคุ้มทุน</li>
                                </ul>
                              </>
                            ) : 'ไม่พบข้อมูล'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1,
                            py: 1
                          }}>
                            ตัวชี้วัดความสำเร็จ
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
                            {formData?.keyMetrics ? (
                              <>
                                <strong>ตัวชี้วัดปัจจุบัน:</strong>
                                <MarkdownViewer content={formData.keyMetrics} />
                                <strong>คำแนะนำ:</strong>
                                <ul>
                                  <li>ติดตามตัวชี้วัดหลัก (KPIs) อย่างสม่ำเสมอ</li>
                                  <li>ตั้งเป้าหมายที่วัดผลได้ชัดเจน</li>
                                  <li>ปรับปรุงกระบวนการตามผลการวัด</li>
                                </ul>
                              </>
                            ) : 'ไม่พบข้อมูล'}
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
              <Grid container spacing={4} sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 4, sm: 6, md: 8 } }}>
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
          </>
        )}
      </Container>
    </Box>
  );
} 