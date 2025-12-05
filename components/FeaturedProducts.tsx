'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useCartAnimation } from '@/contexts/CartAnimationContext'
import { Product } from '@/types'

const featuredProducts: Product[] = [
  {
    id: 1,
    sku: 'ZM01',
    slug: 'bo-am-tach-hac-do-vuong-gia',
    name: 'Bộ Ấm Tách Hạc Đỏ Vương Giả',
    price: 1000000,
    originalPrice: undefined,
    image: '/images/products/am-tra/1.jpeg',
    rating: 5,
    reviews: 128,
    badge: 'Premium',
    category: 'sets',
    inStock: true,
    capacity: '250ml'
  },
  {
    id: 2,
    sku: 'ZM02',
    slug: 'bo-am-tach-hac-xanh-ngoc',
    name: 'Bộ Ấm Tách Hạc Xanh Ngọc',
    price: 1000000,
    originalPrice: undefined,
    image: '/images/products/am-tra/2.jpeg',
    rating: 5,
    reviews: 89,
    badge: 'New',
    category: 'sets',
    inStock: true,
    capacity: '250ml'
  },
  {
    id: 3,
    sku: 'ZM03',
    slug: 'bo-am-tach-lam-ngoc-vu-dieu',
    name: 'Bộ Ấm Tách Lam Ngọc Vũ Điểu',
    price: 1000000,
    originalPrice: undefined,
    image: '/images/products/am-tra/3.jpeg',
    rating: 5,
    reviews: 56,
    badge: 'Exclusive',
    category: 'sets',
    inStock: true,
    capacity: '250ml'
  },
  {
    id: 4,
    sku: 'ZM04',
    slug: 'bo-am-tach-thanh-lien',
    name: 'Bộ Ấm Tách Thanh Liên',
    price: 1000000,
    originalPrice: undefined,
    image: '/images/products/am-tra/4.jpeg',
    rating: 5,
    reviews: 203,
    badge: 'Best Seller',
    category: 'sets',
    inStock: true,
    capacity: '250ml'
  }
]

// Đơn giản hóa animation - tránh giật lag
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0.8 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
}

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set())
  const { addItem, isInCart } = useCart()
  const { triggerAnimation } = useCartAnimation()
  const productRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const productElement = productRefs.current.get(product.id)
    if (productElement) {
      triggerAnimation(product.image, productElement)
    }
    
    addItem(product, 1)
    
    setAddedProducts(prev => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedProducts(prev => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 2000)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-incanto-cloud-dancer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-incanto-dark mb-3 sm:mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto">
            Tuyển tập những sản phẩm được yêu thích nhất
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="overflow-x-auto pb-4 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {featuredProducts.map((product) => {
              const isAdded = addedProducts.has(product.id)
              const alreadyInCart = isInCart(product.id)
              
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="flex-shrink-0 w-[70vw] sm:w-auto bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative hover:-translate-y-2"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {product.badge && (
                    <div className="absolute z-10 top-5 left-5 sm:top-6 sm:left-6">
                      <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full backdrop-blur-sm ${
                        product.badge === 'Best Seller' ? 'bg-rose-500/90 text-white' :
                        product.badge === 'Limited' ? 'bg-violet-500/90 text-white' :
                        product.badge === 'New' ? 'bg-emerald-500/90 text-white' :
                        'bg-amber-500/90 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute z-10 top-5 right-5 sm:top-6 sm:right-6 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-rose-500 transition-colors" />
                  </motion.button>

                  <div 
                    ref={(el) => {
                      if (el) productRefs.current.set(product.id, el)
                    }}
                    className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-transform duration-500 ease-out ${
                        hoveredProduct === product.id ? 'scale-105' : 'scale-100'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-incanto-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                              i < product.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.inStock}
                      className={`w-full text-white text-sm font-medium py-2.5 sm:py-3 rounded-xl mt-2 sm:mt-3 flex items-center justify-center gap-2 transition-all sm:opacity-0 sm:group-hover:opacity-100 ${
                        isAdded || alreadyInCart
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-incanto-primary hover:bg-incanto-teal-dark'
                      } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã thêm</span>
                        </>
                      ) : alreadyInCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Trong giỏ hàng</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Thêm vào giỏ</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <Link href="/products">
            <button className="inline-flex items-center gap-2 bg-incanto-dark hover:bg-incanto-secondary text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-200 min-h-[48px] hover:scale-[1.02] active:scale-[0.98]">
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
