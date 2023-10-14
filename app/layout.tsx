import './globals.css'
import { Urbanist } from 'next/font/google'
import type { Metadata } from 'next'

import { NavBar } from '@/components/navbar'
import { Footer } from '@/components/ui/footer'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Shop',
  description: `Men's watch`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
