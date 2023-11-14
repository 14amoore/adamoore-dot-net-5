import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const defaultLayout = 'flex flex-col z-10 max-w-5xl w-full font-mono text-lg justify-between sm:p-24 p-10 min-h-screen '

export const metadata: Metadata = {
  title: 'adamoore.net V5',
  description: `Adam's Dev Porfolio`,
  openGraph: {
    title: 'adamoore.net V5',
    description: `Adam's Dev Porfolio`,
    url: 'https://www.adamoore.net',
    siteName: 'adamoore.net',
    locale: 'en_US',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={defaultLayout}>
          {children}
        </div>
      </body>
    </html>
  )
}
