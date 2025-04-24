'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import { ThemeToggle } from '@/components/ThemeToggle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'black',
        background: `radial-gradient(circle at 50% 50%, ${alpha('#1a1a1a', 0.95)} 0%, ${alpha('#000000', 0.95)} 100%)`,
        position: 'relative',
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/grid.svg")',
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 6, md: 8 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(159, 122, 234, 0.3)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '60%',
                  height: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                  borderRadius: 2,
                }
              }}
            >
              ระบบประเมินไอเดียธุรกิจ
            </Typography>
            <ThemeToggle />
          </Box>

          {/* Hero Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h2" 
                gutterBottom
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '0 0 30px rgba(159, 122, 234, 0.3)',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'fadeIn 0.8s ease-out',
                  '@keyframes fadeIn': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                ยินดีต้อนรับสู่ระบบประเมินไอเดียธุรกิจ
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 6, 
                  maxWidth: '800px', 
                  mx: 'auto', 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontWeight: 'normal',
                  lineHeight: 1.8,
                  animation: 'fadeIn 0.8s ease-out 0.2s both',
                }}
              >
                ระบบนี้จะช่วยคุณในการประเมินไอเดียธุรกิจของคุณ โดยวิเคราะห์จากปัจจัยต่างๆ 
                เพื่อให้คุณสามารถตัดสินใจได้อย่างมีประสิทธิภาพและเพิ่มโอกาสความสำเร็จในการเริ่มต้นธุรกิจ
              </Typography>
              <Box sx={{ 
                animation: 'fadeIn 0.8s ease-out 0.4s both',
                '& > button': {
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                  }
                }
              }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/evaluate')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                    mr: 2,
                  }}
                >
                  เริ่มประเมินไอเดีย
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/advice')}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: `0 10px 20px rgba(0, 0, 0, 0.2)`,
                    },
                  }}
                >
                  ดูคำแนะนำธุรกิจ
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Features */}
          <Grid container spacing={4}>
            <Grid component="div" item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  animation: 'fadeIn 0.8s ease-out 0.6s both',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                    }
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Box
                      className="feature-icon"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.3)})`,
                        backdropFilter: 'blur(10px)',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    >
                      <AssessmentIcon color="primary" sx={{ fontSize: 32 }} />
                    </Box>
                  }
                  title={
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      ประเมินความเหมาะสม
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8 }}>
                    วิเคราะห์ไอเดียธุรกิจของคุณจากหลายมุมมอง ทั้งด้านการตลาด การเงิน และความเป็นไปได้
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid component="div" item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.secondary.main, 0.2)}`,
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <TipsAndUpdatesIcon color="secondary" sx={{ fontSize: 32 }} />
                    </Box>
                  }
                  title={
                    <Typography variant="h6" color="secondary" sx={{ fontWeight: 600 }}>
                      รับคำแนะนำ
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    รับข้อเสนอแนะที่เป็นประโยชน์สำหรับการปรับปรุงและพัฒนาไอเดียธุรกิจของคุณ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid component="div" item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.3)})`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <BusinessCenterIcon color="primary" sx={{ fontSize: 32 }} />
                    </Box>
                  }
                  title={
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      วางแผนธุรกิจ
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    ได้แนวทางในการวางแผนธุรกิจที่ชัดเจน พร้อมข้อมูลที่จำเป็นสำหรับการตัดสินใจ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
} 