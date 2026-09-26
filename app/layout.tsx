import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { MotionProvider } from '@/components/motion-provider'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const title = 'Jilla Srivardhan | AI/ML Engineer | Generative AI & RAG'
const description =
  'Portfolio of Jilla Srivardhan, an aspiring AI/ML Engineer focused on Generative AI, RAG, AI Agents, Python, and practical intelligent applications.'

export const metadata: Metadata = {
  title,
  description,
  generator: 'v0.app',
  authors: [{ name: 'Jilla Srivardhan' }],
  keywords: ['Jilla Srivardhan', 'AI/ML Engineer', 'Generative AI', 'RAG', 'AI Agents', 'LangChain', 'Python'],
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'Jilla Srivardhan',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07080b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
