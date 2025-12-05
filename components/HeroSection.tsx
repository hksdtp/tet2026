'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Play, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Video shrink effect: 10% → 40% scroll
  // Scale từ 1 → 0.85
  const videoScale = useTransform(scrollYProgress, [0, 0.1, 0.4], [1, 1, 0.85])
  // Border radius từ 0 → 24px
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 24])
  // Opacity fade out: 20-40%
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])
  // Translate Y - di chuyển lên nhẹ khi thu gọn
  const videoY = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, -30])

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
              // GPU acceleration
              willChange: 'transform, opacity, border-radius',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoaded}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderRadius: 'inherit' }}
            >
              <source src="/videos/hero-intro.mp4" type="video/mp4" />
            </video>

            {/* Subtle overlay cho navigation */}
            <div
              className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent"
              style={{ borderRadius: 'inherit' }}
            />
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
              className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-3 cursor-pointer"
              onClick={handleScrollDown}
            >
              <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-white text-sm font-medium tracking-wider">Cuộn để khám phá</span>
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-8 h-8 text-incanto-accent drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Container - Cloud Dancer background */}
      <div className="relative z-10 bg-incanto-cloud-dancer">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Description - ngắn gọn */}
          <p className="text-lg sm:text-xl lg:text-2xl text-incanto-dark/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Bộ sưu tập đồ dùng bàn ăn cao cấp, được tạo nên từ cảm hứng thiên nhiên Á Đông.
            <span className="hidden sm:inline text-incanto-primary"> Nâng tầm trải nghiệm thưởng trà và ẩm thực hằng ngày.</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/collections" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-h-[52px] px-8 !bg-gradient-to-r !from-incanto-accent !to-[#A8914F] !text-incanto-dark font-semibold text-base shadow-lg shadow-incanto-accent/30"
              >
                Khám Phá Bộ Sưu Tập
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsVideoPlaying(true)}
              leftIcon={<Play className="w-5 h-5" />}
              className="w-full sm:w-auto min-h-[52px] px-8 !border-incanto-dark/30 !text-incanto-dark hover:!bg-incanto-dark/10"
            >
              Câu Chuyện INCANTO
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </motion.button>
              <div className="aspect-video bg-incanto-dark rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-70">Video câu chuyện INCANTO</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
