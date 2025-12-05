'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useCartAnimation } from '@/contexts/CartAnimationContext'

interface ProductCardProps {
  product: {
    id: number
    slug?: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    badge?: string
    inStock: boolean
    capacity?: string
  }
  viewMode: 'grid' | 'list'
  index?: number
}

// Apple-style animation config
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

export function ProductCard({ product, viewMode, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addItem } = useCart()
  const { triggerAnimation } = useCartAnimation()
  const addToCartBtnRef = useRef<HTMLButtonElement>(null)

  const isListView = viewMode === 'list'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Add to cart
    addItem({
      id: product.id,
      slug: product.slug || '',
      sku: '',
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      category: 'sets',
      badge: product.badge as 'Best Seller' | 'Limited' | 'New' | 'Premium' | 'Exclusive' | undefined,
      inStock: product.inStock,
      capacity: product.capacity || '',
      material: '',
      setIncludes: '',
      packaging: '',
    }, 1)

    // Trigger animation
    if (addToCartBtnRef.current) {
      triggerAnimation(product.image, addToCartBtnRef.current)
    }

    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      <Link href={`/products/${product.slug || product.id}`} className="group block touch-manipulation">
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 ${
            isListView ? 'flex' : ''
          }`}
        >
          {/* Badge */}
          {product.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute z-10 top-3 left-3 sm:top-4 sm:left-4"
            >
              <span className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full backdrop-blur-sm ${
                product.badge === 'Best Seller' ? 'bg-red-500/90 text-white' :
                product.badge === 'Limited' ? 'bg-purple-500/90 text-white' :
                product.badge === 'New' ? 'bg-green-500/90 text-white' :
                product.badge === 'Premium' || product.badge === 'Exclusive' ? 'bg-incanto-primary/90 text-white' :
                'bg-blue-500/90 text-white'
              }`}>
                {product.badge}
              </span>
            </motion.div>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute z-10 inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">Hết hàng</span>
            </div>
          )}

          {/* Product image */}
          <div className={`relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 ${
            isListView ? 'w-32 sm:w-48 h-32 sm:h-48 flex-shrink-0' : 'aspect-square'
          }`}>
            {/* Skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Quick action - Heart (visible on mobile) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg active:bg-gray-100 transition-colors z-10"
              aria-label="Thêm vào yêu thích"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </motion.button>

            {/* Quick add to cart (desktop hover only) */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block absolute bottom-3 left-3 right-3"
            >
              <motion.button
                ref={addToCartBtnRef}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`w-full py-2.5 backdrop-blur-md rounded-xl text-sm font-medium shadow-lg transition-colors ${
                  isAddedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-white/95 text-gray-800 hover:bg-white'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-4 h-4 inline mr-2" />
                    Đã thêm
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 inline mr-2" />
                    Thêm vào giỏ
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Product info */}
          <div className={`p-3 sm:p-4 space-y-1.5 sm:space-y-2 ${isListView ? 'flex-1 py-3' : ''}`}>
            <h3 className="font-medium text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-incanto-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating - compact on mobile */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">{product.rating}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
