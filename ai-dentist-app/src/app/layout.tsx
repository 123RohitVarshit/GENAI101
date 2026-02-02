import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Dentist - Your Personal Dental Assistant',
  description: 'AI-powered personal dentist that remembers everything about your dental health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}