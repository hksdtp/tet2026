'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Play, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Mobile: giảm scale effect, Desktop: giữ nguyên
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4],
    isMobile ? [1, 1, 0.92] : [1, 1, 0.85]
  )
  // Mobile: border radius nhỏ hơn
  const videoBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4],
    isMobile ? [0, 0, 16] : [0, 0, 24]
  )
  // Opacity fade out: 20-40%
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])
  // Translate Y - mobile ít hơn
  const videoY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4],
    isMobile ? [0, 0, -15] : [0, 0, -30]
  )

  // Overlay opacity - fade in từ 0-30%
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.6])

  // Track scroll để ẩn/hiện các phần tử
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Ẩn scroll indicator khi scroll > 3%
    if (latest > 0.03) {
      setShowScrollIndicator(false)
    } else {
      setShowScrollIndicator(true)
    }

    // Pause/play video dựa trên scroll position để tối ưu performance
    if (latest > 0.4) {
      setIsVideoVisible(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    } else {
      setIsVideoVisible(true)
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play()
      }
    }
  })

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.4,
      behavior: 'smooth'
    })
  }

  return (
    <section ref={sectionRef} className="relative">
      {/* Hero container - chứa video, overlay và content, full screen */}
      <div className="relative h-screen overflow-hidden">
        {/* Static gradient background - hiển thị khi video fade out */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-incanto-dark via-incanto-primary/80 to-incanto-secondary" />

        {/* Video Background - shrink + fade out khi scroll */}
        {isVideoVisible && (
          <motion.div
            className="absolute inset-0 z-[1] flex items-center justify-center"
            style={{
              opacity: videoOpacity,
              scale: videoScale,
              y: videoY,
              borderRadius: videoBorderRadius,
              willChange: 'transform, opacity, border-radius',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={handleVideoLoaded}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderRadius: 'inherit',
                // Mobile: đảm bảo video fill đầy màn hình portrait
                objectPosition: isMobile ? 'center center' : 'center center',
              }}
            >
              <source src="/videos/hero-intro.mp4" type="video/mp4" />
            </video>

            {/* Subtle overlay cho navigation - mobile cao hơn cho safe area */}
            <div
              className="absolute top-0 left-0 right-0 h-24 md:h-20 bg-gradient-to-b from-black/50 md:from-black/40 to-transparent"
              style={{ borderRadius: 'inherit' }}
            />

            {/* Mobile: gradient bottom để text dễ đọc hơn */}
            {isMobile && (
              <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"
                style={{ borderRadius: 'inherit' }}
              />
            )}
          </motion.div>
        )}

        {/* Dynamic overlay - tối dần khi scroll */}
        <motion.div
          className="absolute inset-0 z-[2] bg-gradient-to-t from-incanto-dark via-incanto-dark/60 to-transparent pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* Fallback gradient background khi video chưa load */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-incanto-dark via-incanto-primary to-incanto-secondary z-[3]" />
        )}

        {/* Scroll indicator - ẩn hoàn toàn khỏi DOM khi scroll */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-2 md:gap-3 cursor-pointer safe-area-bottom"
              onClick={handleScrollDown}
            >
              <div className="px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-white text-xs md:text-sm font-medium tracking-wider">Cuộn để khám phá</span>
              </div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-incanto-accent drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Container - Cloud Dancer background */}
      <div className="relative z-10 bg-incanto-cloud-dancer">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-20">
          {/* Description - responsive text */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-incanto-dark/80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-light">
            Bộ sưu tập đồ dùng bàn ăn cao cấp, được tạo nên từ cảm hứng thiên nhiên Á Đông.
            <span className="hidden sm:inline text-incanto-primary"> Nâng tầm trải nghiệm thưởng trà và ẩm thực hằng ngày.</span>
          </p>

          {/* CTA buttons - mobile optimized */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link href="/collections" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-h-[48px] md:min-h-[52px] px-6 md:px-8 !bg-gradient-to-r !from-incanto-accent !to-[#A8914F] !text-incanto-dark font-semibold text-sm md:text-base shadow-lg shadow-incanto-accent/30"
              >
                Khám Phá Bộ Sưu Tập
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsVideoPlaying(true)}
              leftIcon={<Play className="w-4 h-4 md:w-5 md:h-5" />}
              className="w-full sm:w-auto min-h-[48px] md:min-h-[52px] px-6 md:px-8 !border-incanto-dark/30 !text-incanto-dark hover:!bg-incanto-dark/10 text-sm md:text-base"
            >
              Câu Chuyện INCANTO
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal - Mobile optimized */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 md:bg-black/80 p-2 md:p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - mobile: góc phải trong video, desktop: trên video */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(false)}
                className="absolute -top-10 md:-top-12 right-0 md:right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-7 h-7 md:w-8 md:h-8" />
              </motion.button>

              {/* Video container - mobile full width, responsive aspect ratio */}
              <div className="aspect-[9/16] md:aspect-video bg-incanto-dark rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center text-white px-4">
                  <Play className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 opacity-50" />
                  <p className="text-base md:text-lg opacity-70">Video câu chuyện INCANTO</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
