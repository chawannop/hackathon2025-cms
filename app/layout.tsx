import './globals.css'

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
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
