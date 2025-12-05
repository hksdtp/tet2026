'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ChevronUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-incanto-dark mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand - full width on mobile */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-incanto-accent to-incanto-primary rounded-full flex items-center justify-center">
                <span className="text-incanto-dark font-bold text-lg sm:text-xl">I</span>
              </div>
              <span className="font-semibold text-lg sm:text-xl text-incanto-light">INCANTO</span>
            </div>
            <p className="text-sm sm:text-base text-incanto-light/70 mb-5 max-w-md leading-relaxed">
              Nơi thiên nhiên Á Đông hội tụ cùng nghệ thuật trà đạo tinh hoa Việt Nam.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/incantovietnam', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/incantovietnam', label: 'Instagram' },
                { icon: Youtube, href: 'https://www.youtube.com/@incantovietnam', label: 'Youtube' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-incanto-primary/20 text-incanto-light/70 hover:bg-incanto-accent hover:text-incanto-dark transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-incanto-accent mb-3 sm:mb-4">Khám phá</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { href: '/products', label: 'Sản phẩm' },
                { href: '/collections', label: 'Bộ sưu tập' },
                { href: '/about', label: 'Về chúng tôi' },
                { href: '/contact', label: 'Liên hệ' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-incanto-light/70 hover:text-incanto-accent transition-colors inline-block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-incanto-accent mb-3 sm:mb-4">Liên hệ</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <a href="tel:0916861166" className="flex items-center gap-2 text-sm text-incanto-light/70 hover:text-incanto-accent transition-colors py-0.5">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>091.686.1166</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@incantovietnam.com.vn" className="flex items-center gap-2 text-sm text-incanto-light/70 hover:text-incanto-accent transition-colors py-0.5">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@incantovietnam.com.vn</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-incanto-light/70 py-0.5">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Số 24, Villa D, The Manor, Hà Nội</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-incanto-primary/20 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-incanto-light/50 text-center sm:text-left">
            © 2025 Nguyen Hai Ninh. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-incanto-light/50 hover:text-incanto-accent transition-colors"
          >
            <span>Về đầu trang</span>
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
