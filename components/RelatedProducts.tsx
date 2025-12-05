'use client'

import { ArrowRight, Star, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'

interface RelatedProductsProps {
  currentProductId?: number
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Lấy 4 sản phẩm ngẫu nhiên, loại trừ sản phẩm hiện tại
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4)
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sản phẩm liên quan</h2>
            <p className="text-gray-600">Khám phá thêm các sản phẩm khác từ INCANTO</p>
          </div>
          <Link href="/products" className="flex items-center space-x-2 text-amber-700 font-medium hover:space-x-3 transition-all">
            <span>Xem tất cả</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group">
              <div className="product-card bg-white rounded-2xl overflow-hidden">
                {/* Product image */}
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Product info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    <button className="p-2 text-amber-700 hover:bg-amber-50 rounded-full transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
