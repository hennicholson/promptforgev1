import type { Metadata } from 'next'
import { Inter, Anton } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const anton = Anton({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})

export const metadata: Metadata = {
  title: 'Prompt Forge - AI Image Prompt Designer by Skinny Studio',
  description: 'Professional AI image prompt generator with templates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script>
      </head>
      <body className={`${inter.variable} ${anton.variable}`}>
        {children}
      </body>
    </html>
  )
}