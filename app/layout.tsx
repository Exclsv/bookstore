import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Store',
  description: 'Find your next book',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.className} relative min-h-screen overflow-x-clip bg-background`}>
        {children}
      </body>
    </html>
  )
}
