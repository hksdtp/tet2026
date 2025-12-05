'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    id: 'spring-2025',
    name: 'Bộ sưu tập Xuân 2025',
    description: 'Tinh hoa nghệ thuật trà đạo cho mùa xuân mới',
    image: '/api/placeholder/800/600',
    productCount: 12
  },
  {
    id: 'classic',
    name: 'Cổ điển vượt thời gian',
    description: 'Những thiết kế kinh điển không bao giờ lỗi mốt',
    image: '/api/placeholder/800/600',
    productCount: 18
  },
  {
    id: 'premium',
    name: 'Premium Collection',
    description: 'Dòng sản phẩm cao cấp dành cho người sành trà',
    image: '/api/placeholder/800/600',
    productCount: 8
  },
  {
    id: 'gift-sets',
    name: 'Bộ quà tặng',
    description: 'Lựa chọn hoàn hảo cho những dịp đặc biệt',
    image: '/api/placeholder/800/600',
    productCount: 15
  }
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-incanto-light/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-incanto-dark mb-4"
          >
            Bộ Sưu Tập
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá những bộ sưu tập được tuyển chọn kỹ lưỡng từ INCANTO
          </motion.p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/products?collection=${collection.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100 aspect-[4/3] group cursor-pointer"
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <p className="text-sm text-white/70 mb-1">{collection.productCount} sản phẩm</p>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">{collection.name}</h3>
                      <p className="text-sm sm:text-base text-white/80 mb-4">{collection.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                        Khám phá ngay <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

