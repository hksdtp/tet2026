'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'

// SVG Icons - Phong cách cổ phong
const HandsIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 20C8 20 6 16 6 12C6 8 8 6 10 6C12 6 14 8 16 12C18 8 20 6 22 6C24 6 26 8 26 12C26 16 24 20 24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 20C8 20 10 24 16 26C22 24 24 20 24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M20 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
)

const LeafBrandIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 26C6 26 9 18 16 13C23 8 28 6 28 6C28 6 25 14 18 19C11 24 6 26 6 26Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 26C6 26 11 22 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
)

const TargetBrandIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
    <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    <circle cx="16" cy="16" r="2" fill="currentColor"/>
  </svg>
)

const features = [
  {
    icon: HandsIcon,
    title: 'Chế tác thủ công',
    description: 'Mỗi sản phẩm được làm tay bởi những nghệ nhân lành nghề nhất, kết tinh kinh nghiệm và tâm huyết qua nhiều thế hệ.',
    accent: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: LeafBrandIcon,
    title: 'Vật liệu tự nhiên',
    description: 'Tuyển chọn kỹ lưỡng những vật liệu tự nhiên tốt nhất: gỗ sồi Bắc Mỹ, tử sa Hà Nam, sứ Bát Tràng.',
    accent: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: TargetBrandIcon,
    title: 'Độc bản và hạn chế',
    description: 'Mỗi bộ sản phẩm có số lượng giới hạn, đi kèm thẻ chứng nhận và tem chống hàng giả đảm bảo giá trị sưu tầm.',
    accent: 'from-purple-500/20 to-indigo-500/20',
  },
]

export function BrandStorySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-incanto-cloud-dancer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-incanto-dark mb-4">
            Câu Chuyện{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-incanto-primary to-incanto-accent">
              INCANTO
            </span>
          </h2>
          <p className="text-base sm:text-lg text-incanto-dark/70 max-w-2xl mx-auto leading-relaxed">
            Ra đời từ niềm đam mê với văn hóa trà đạo Việt Nam, INCANTO là hành trình khôi phục
            và tôn vinh những giá trị truyền thống ngàn năm.
          </p>
        </motion.div>

        {/* Bento Grid - 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-incanto-dark/5"
            >
              {/* Gradient accent background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-incanto-primary/10 rounded-xl flex items-center justify-center mb-5 text-incanto-primary group-hover:bg-incanto-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-incanto-dark">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-incanto-dark/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/about">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="min-h-[52px] px-8 !bg-gradient-to-r !from-incanto-accent !to-[#A8914F] !text-incanto-dark font-semibold text-base shadow-lg shadow-incanto-accent/30 hover:shadow-xl hover:shadow-incanto-accent/40 transition-shadow"
            >
              Tìm hiểu thêm
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

