import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const defaultLayout = 'flex flex-col z-10 max-w-5xl w-full font-mono text-lg justify-between sm:p-24 p-10 min-h-screen '

export const metadata: Metadata = {
  title: 'adamoore.net V 5',
  description: 'This is a next app',
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
