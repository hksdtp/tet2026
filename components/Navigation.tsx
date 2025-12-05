'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useCartAnimation } from '@/contexts/CartAnimationContext'
import { CountBadge } from '@/components/ui'

const navLinks = [
  { href: '/products', label: 'Sản phẩm' },
  { href: '/collections', label: 'Bộ sưu tập' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/contact', label: 'Liên hệ' }
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)
  const pathname = usePathname()
  const { itemCount, isLoaded } = useCart()
  const { setCartIconRef } = useCartAnimation()
  const cartIconRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const prevItemCount = useRef(itemCount)

  // Register cart icon ref for animation
  useEffect(() => {
    if (cartIconRef.current) {
      setCartIconRef(cartIconRef.current)
    }
  }, [setCartIconRef])

  // Bounce effect when item count changes
  useEffect(() => {
    if (itemCount > prevItemCount.current) {
      setCartBounce(true)
      setTimeout(() => setCartBounce(false), 600)
    }
    prevItemCount.current = itemCount
  }, [itemCount])

  // Throttled scroll handler for performance optimization
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY
        setIsScrolled(scrollY > 50)
        lastScrollY.current = scrollY
        ticking.current = false
      })
      ticking.current = true
    }
  }, [])

  useEffect(() => {
    // Check initial scroll position
    setIsScrolled(window.scrollY > 50)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 sm:w-12 sm:h-12"
              >
                <Image
                  src="/images/logo.png"
                  alt="INCANTO"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <span className="font-serif font-semibold text-lg sm:text-xl tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:text-incanto-accent transition-colors duration-300">
                INCANTO
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]
                    ${pathname === link.href
                      ? 'text-incanto-accent'
                      : 'text-white/95 hover:text-incanto-accent hover:bg-white/10'
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full -z-10 bg-incanto-accent/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex p-2.5 rounded-full transition-all duration-300 text-white/95 hover:text-incanto-accent hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Cart Button */}
              <Link href="/cart">
                <motion.div
                  ref={cartIconRef}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={cartBounce ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative p-2.5 rounded-full transition-all duration-300 text-white/95 hover:text-incanto-accent hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {isLoaded && <CountBadge count={itemCount} />}
                </motion.div>
              </Link>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-full transition-all duration-300 text-white/95 hover:text-incanto-accent hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

      </motion.nav>

      {/* Mobile Menu - Slide-in from Right Style */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Menu from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-white shadow-2xl overflow-hidden"
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="font-serif font-semibold text-lg text-incanto-primary">Menu</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <nav className="px-4 py-6 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all active:scale-[0.98]
                        ${pathname === link.href
                          ? 'text-incanto-primary bg-incanto-primary/10'
                          : 'text-gray-800 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-4 border-t border-gray-100" />

                {/* Search on mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <button
                    className="flex items-center w-full px-4 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-all active:scale-[0.98]"
                  >
                    <Search className="w-5 h-5 mr-3" />
                    Tìm kiếm
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                >
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-all active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5" />
                      Giỏ hàng
                    </span>
                    {isLoaded && itemCount > 0 && (
                      <span className="px-3 py-1 bg-incanto-primary text-white text-sm font-semibold rounded-full min-w-[28px] text-center">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </motion.div>

                {/* Safe area for home indicator */}
                <div className="h-8" />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  )
}
