import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";
import { RootLayout as ClientRootLayout } from "./components/RootLayout";

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
        <Providers>
          <ClientRootLayout>
            {children}
          </ClientRootLayout>
        </Providers>
      </body>
    </html>
  );
}
