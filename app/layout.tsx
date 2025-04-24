import './globals.css'
import { Providers } from './providers'
import { Noto_Sans_Thai, Sarabun } from 'next/font/google'

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
})

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-sarabun',
})

export const metadata = {
  title: 'Business Idea Evaluator',
  description: 'ประเมินไอเดียธุรกิจของคุณ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning className={`${notoSansThai.variable} ${sarabun.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
