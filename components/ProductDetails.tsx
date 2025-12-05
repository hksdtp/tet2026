'use client'

import { useState, useRef } from 'react'
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Check, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getProductBySlug } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useCartAnimation } from '@/contexts/CartAnimationContext'

export function ProductDetails({ slug }: { slug: string }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { triggerAnimation } = useCartAnimation()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const addToCartBtnRef = useRef<HTMLButtonElement>(null)

  const productData = getProductBySlug(slug)

  if (!productData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy sản phẩm</h1>
      </div>
    )
  }

  const productImages = productData.images || [productData.image]

  const product = {
    ...productData,
    images: productImages,
    features: [
      `Mã sản phẩm: ${productData.sku}`,
      `Bộ bao gồm: ${productData.setIncludes}`,
      `Dung tích: ${productData.capacity}`,
      `Chất liệu: ${productData.material}`,
      `Đóng gói: ${productData.packaging}`,
    ],
    specifications: {
      'Tổng chiều dài': productData.dimensions?.totalLength || '',
      'Đường kính ấm': productData.dimensions?.teapotDiameter || '',
      'Đường kính đĩa': productData.dimensions?.saucerDiameter || '',
      'Chiều cao ấm': productData.dimensions?.teapotHeight || '',
      'Chiều cao tách': productData.dimensions?.cupHeight || '',
    },
  }

  const handleAddToCart = () => {
    // Add to cart
    addItem(productData, quantity)

    // Trigger flying animation
    if (addToCartBtnRef.current) {
      triggerAnimation(productData.image, addToCartBtnRef.current)
    }

    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 3000)
  }

  const handleBuyNow = () => {
    // Add to cart first
    addItem(productData, quantity)
    router.push('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail gallery */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-amber-700 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Badge */}
          {product.badge && (
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              <span>✨</span>
              <span>{product.badge}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* SKU */}
          <p className="text-gray-500">Mã SP: {product.sku}</p>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < product.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} đánh giá)</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Palette & Style */}
          {product.colorPalette && (
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600"><strong>Màu sắc:</strong> {product.colorPalette}</p>
              {product.style && <p className="text-sm text-gray-600 mt-2"><strong>Phong cách:</strong> {product.style}</p>}
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Số lượng</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border-2 border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors rounded-l-full"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors rounded-r-full"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-600">
                {product.inStock ? '✓ Còn hàng' : 'Hết hàng'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex gap-3 flex-1">
              <button
                ref={addToCartBtnRef}
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isAddedToCart
                    ? 'bg-green-600 text-white'
                    : 'btn-secondary text-base sm:text-lg'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Đã thêm</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Thêm vào giỏ</span>
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 btn-primary text-base sm:text-lg"
              >
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Thanh toán ngay</span>
              </button>
            </div>
            <div className="flex gap-3 justify-center">
              <button className="p-4 border-2 border-gray-300 rounded-full hover:border-amber-700 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-full hover:border-amber-700 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Đặc điểm nổi bật</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Thông số kỹ thuật</h3>
            <dl className="grid grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                  <dt className="text-gray-600">{key}:</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
