'use client'

import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, subtotal, discount, shipping, total, isLoaded } = useCart()

  // Hiển thị loading khi đang load cart từ localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-incanto-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 lg:pt-24">
        <div className="text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-incanto-dark">Giỏ hàng trống</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link href="/products" className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px]">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24 pb-6 sm:pb-8 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-incanto-dark">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-6">
                  {/* Product image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-semibold text-sm sm:text-lg text-incanto-dark line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">Dung tích: {item.capacity}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                      {/* Price */}
                      <div>
                        <span className="text-base sm:text-xl font-bold text-incanto-dark">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                            {(item.originalPrice * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center border-2 border-gray-300 rounded-full self-start">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2.5 sm:p-2 hover:bg-gray-100 transition-colors rounded-l-full min-w-[40px] min-h-[40px] flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-2 font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2.5 sm:p-2 hover:bg-gray-100 transition-colors rounded-r-full min-w-[40px] min-h-[40px] flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stock status */}
                    {!item.inStock && (
                      <p className="text-red-500 text-xs sm:text-sm mt-2">Sản phẩm tạm thời hết hàng</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 sticky top-20">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-incanto-dark">Tóm tắt đơn hàng</h2>

              {/* Promo code */}
              <div className="mb-4 sm:mb-6">
                <label className="text-xs sm:text-sm text-gray-600 mb-2 block">Mã giảm giá</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary min-h-[44px]"
                  />
                  <button className="btn-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px]">
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-lg">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium text-incanto-dark">
                    {subtotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm sm:text-lg text-green-600">
                    <span>Giảm giá:</span>
                    <span className="font-medium">
                      -{discount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-lg">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-incanto-dark">
                    {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')}₫`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    Miễn phí vận chuyển cho đơn hàng từ 2.000.000₫
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg sm:text-2xl font-bold">
                    <span className="text-incanto-dark">Tổng cộng:</span>
                    <span className="text-incanto-accent">
                      {total.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <Link href="/checkout" className="btn-primary w-full text-sm sm:text-lg py-3 sm:py-4 block text-center min-h-[48px]">
                Tiến hành thanh toán
              </Link>

              {/* Continue shopping */}
              <Link
                href="/products"
                className="block text-center mt-3 sm:mt-4 text-sm sm:text-base text-incanto-primary hover:text-incanto-accent hover:underline transition-colors"
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
