import { Be_Vietnam_Pro, Cinzel } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Providers } from './providers'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata = {
  title: 'INCANTO - TẾT 2026',
  description: 'Khám phá bộ sưu tập ấm trà cổ phong tinh hoa từ INCANTO. Nơi truyền thống hội tụ cùng nghệ thuật.',
  keywords: ['ấm trà', 'cổ phong', 'INCANTO', 'trà đạo', 'ẩm thực Việt'],
  authors: [{ name: 'Nguyen Hai Ninh' }],
  copyright: '© 2025 INCANTO. All rights reserved.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${cinzel.variable}`}>
      <body className={beVietnamPro.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
