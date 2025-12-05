'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    slug: 'am-tra-co-phong',
    name: 'Ấm Trà Cổ Phong',
    description: 'Bộ sưu tập ấm trà truyền thống với những họa tiết tinh xảo',
    image: '/api/placeholder/600/400',
    count: '12 sản phẩm',
    cta: 'Khám phá ngay'
  },
  {
    id: 2,
    slug: 'do-dung-ban-an',
    name: 'Đồ Dùng Bàn Ăn',
    description: 'Bộ sưu tập mới đón Tết 2026 - Nâng tầm bữa tiệc gia đình',
    image: '/api/placeholder/600/400',
    count: '8 sản phẩm',
    cta: 'Đón Tết 2026'
  },
  {
    id: 3,
    slug: 'ly-coc-tach',
    name: 'Ly, Cốc & Tách',
    description: 'Tinh hoa gốm sứ cao cấp - Quà tặng ý nghĩa cho người thân yêu',
    image: '/api/placeholder/600/400',
    count: '15 sản phẩm',
    cta: 'Chọn quà tặng'
  }
]

export function Collections() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-incanto-cloud-dancer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-incanto-dark">
            Bộ Sưu Tập
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto px-2">
            Khám phá những bộ sưu tập được thiết kế đặc biệt cho
            những tâm hồn yêu nghệ thuật và trà đạo
          </p>
        </div>

        {/* Collections grid */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections?category=${collection.slug}`}
              className="group block"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Image */}
                <div className={`relative aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-incanto-dark/40 to-transparent" />

                  {/* Product count badge */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    <span className="text-xs sm:text-sm font-medium text-incanto-dark">
                      {collection.count}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-2 sm:space-y-3 lg:space-y-4 text-center lg:text-left px-2 sm:px-0 ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-incanto-dark group-hover:text-incanto-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {collection.description}
                  </p>
                  <button className="inline-flex items-center space-x-2 text-incanto-primary font-medium group-hover:space-x-3 transition-all text-sm sm:text-base">
                    <span>{collection.cta}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <div className="inline-flex flex-col items-center p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-incanto-primary/10 to-incanto-accent/10 rounded-2xl sm:rounded-3xl border border-incanto-primary/20 mx-2 sm:mx-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-incanto-dark">
              Cần tư vấn chuyên sâu?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 lg:mb-6 max-w-md">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng giúp bạn tìm kiếm sản phẩm hoàn hảo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button className="btn-gold px-6 sm:px-8 py-3 text-sm sm:text-base min-h-[48px]">
                Đặt tư vấn miễn phí
              </button>
              <button className="btn-secondary px-6 sm:px-8 py-3 text-sm sm:text-base min-h-[48px]">
                Xem catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
