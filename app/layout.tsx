import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import theme from '@/lib/theme';
import { Logo } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BizSense - Business Idea Evaluator",
  description: "Evaluate and analyze your business ideas with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ 
            minHeight: '100vh',
            bgcolor: 'background.default',
            backgroundImage: `
              radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.08) 0px, transparent 50%),
              radial-gradient(at 97% 21%, hsla(256, 98%, 72%, 0.08) 0px, transparent 50%),
              radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.08) 0px, transparent 50%),
              radial-gradient(at 10% 29%, hsla(133, 96%, 67%, 0.08) 0px, transparent 50%),
              radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.08) 0px, transparent 50%),
              radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.08) 0px, transparent 50%),
              radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.08) 0px, transparent 50%)
            `,
          }}>
            <AppBar position="fixed" elevation={0}>
              <Container>
                <Toolbar sx={{ px: { xs: 2, sm: 4 }, height: 64 }}>
                  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Logo height={40} />
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                    {/* Add your navigation items here */}
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            <Box component="main" sx={{ pt: 10, pb: 4, px: { xs: 2, sm: 4 } }}>
              <Container>
                {children}
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
