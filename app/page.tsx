'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import { ThemeToggle } from '@/components/ThemeToggle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);

export default function Home() {
  const router = useRouter();
  const theme = useTheme();

  const features = [
    {
      icon: <AssessmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "AI-Powered Analysis",
      description: "วิเคราะห์ไอเดียธุรกิจของคุณด้วย AI ที่ทันสมัย",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.2)})`
    },
    {
      icon: <TipsAndUpdatesIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: "Market Insights",
      description: "เข้าใจตลาดและโอกาสทางธุรกิจ",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.2)})`
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: "Risk Assessment",
      description: "ประเมินความเสี่ยงและให้คำแนะนำ",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)}, ${alpha(theme.palette.success.main, 0.2)})`
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          background: 'url("/grid.svg")',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ pt: 4, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BizSense
          </Typography>
          <ThemeToggle />
        </Box>

        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ py: { xs: 8, md: 12 } }}
        >
          <MotionPaper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <MotionTypography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ประเมินไอเดียธุรกิจ
              <br />
              ด้วย AI ที่ชาญฉลาด
            </MotionTypography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              วิเคราะห์ความเป็นไปได้ของธุรกิจ พร้อมคำแนะนำที่เป็นประโยชน์
              เพื่อความสำเร็จของคุณ
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/evaluate')}
              endIcon={<ArrowForwardIcon />}
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
          </MotionPaper>
        </MotionBox>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ py: { xs: 8, md: 12 } }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: feature.gradient,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 