'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, QrCode, Loader2, CheckCircle } from 'lucide-react'
import { products } from '@/data/products'

interface CheckoutItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CustomerInfo {
  fullName: string
  phone: string
  email: string
  address: string
  note: string
}

interface SepayCheckoutData {
  checkoutUrl: string
  formFields: Record<string, unknown>
  transactionId?: string
}

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  })
  const [sepayData, setSepayData] = useState<SepayCheckoutData | null>(null)
  const [orderId, setOrderId] = useState<string>('')
  const [step, setStep] = useState<'info' | 'payment'>('info')
  const formRef = useRef<HTMLFormElement>(null)

  // Load checkout item từ sessionStorage
  useEffect(() => {
    const storedItem = sessionStorage.getItem('checkoutItem')
    if (storedItem) {
      const item = JSON.parse(storedItem)
      setCheckoutItems([item])
    } else {
      // Demo items nếu không có item từ sessionStorage
      setCheckoutItems([
        {
          id: products[0].id,
          name: products[0].name,
          price: products[0].price,
          quantity: 1,
          image: products[0].image,
        }
      ])
    }
  }, [])

  const orderTotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!customerInfo.fullName.trim()) {
      alert('Vui lòng nhập họ và tên')
      return false
    }
    if (!customerInfo.phone.trim()) {
      alert('Vui lòng nhập số điện thoại')
      return false
    }
    // Validate phone format
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/
    if (!phoneRegex.test(customerInfo.phone.replace(/\s/g, ''))) {
      alert('Số điện thoại không hợp lệ')
      return false
    }
    return true
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const newOrderId = `INCANTO-${Date.now()}`
      setOrderId(newOrderId)

      // Lưu đơn hàng vào database/Google Sheet
      const orderData = {
        timestamp: new Date().toISOString(),
        orderId: newOrderId,
        customerName: customerInfo.fullName,
        phone: customerInfo.phone,
        email: customerInfo.email || '',
        address: customerInfo.address || '',
        note: customerInfo.note || '',
        items: checkoutItems.map(item => `${item.name} x${item.quantity}`).join(', '),
        total: orderTotal,
        paymentMethod: 'SePay VietQR',
        paymentStatus: 'pending',
      }

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!orderResponse.ok) {
        throw new Error('Không thể lưu đơn hàng')
      }

      // Khởi tạo thanh toán SePay
      const sepayResponse = await fetch('/api/sepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: newOrderId,
          amount: orderTotal,
          description: `Thanh toán đơn hàng ${newOrderId} - INCANTO Tea Store`,
          customerInfo: {
            name: customerInfo.fullName,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        }),
      })

      if (!sepayResponse.ok) {
        const errorData = await sepayResponse.json()
        throw new Error(errorData.error || 'Không thể khởi tạo thanh toán')
      }

      const sepayResult = await sepayResponse.json()
      setSepayData(sepayResult)
      setStep('payment')

      // Lưu orderId vào sessionStorage để dùng ở trang success/error
      sessionStorage.setItem('pendingOrderId', newOrderId)

    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleProceedToPayment = () => {
    if (formRef.current && sepayData) {
      formRef.current.submit()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12 pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-incanto-dark">Thanh toán</h1>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step === 'info' ? 'text-incanto-primary' : 'text-green-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'info' ? 'bg-incanto-primary text-white' : 'bg-green-600 text-white'}`}>
              {step === 'payment' ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className="ml-2 font-medium">Thông tin</span>
          </div>
          <div className="w-16 h-0.5 mx-4 bg-gray-300" />
          <div className={`flex items-center ${step === 'payment' ? 'text-incanto-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-incanto-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Thanh toán</span>
          </div>
        </div>

        {step === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Checkout form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Contact information */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-incanto-dark">Thông tin liên hệ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerInfo.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary min-h-[44px]"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary min-h-[44px]"
                      placeholder="09xxxxxxxx"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary min-h-[44px]"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address - Optional */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-incanto-dark">Địa chỉ giao hàng</h2>
                <p className="text-sm text-gray-500 mb-4">(Tùy chọn - có thể để trống)</p>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Địa chỉ nhận hàng
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary min-h-[44px]"
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Ghi chú
                    </label>
                    <textarea
                      rows={3}
                      name="note"
                      value={customerInfo.note}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary"
                      placeholder="Ghi chú về đơn hàng..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment method - SePay only */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-incanto-dark">Phương thức thanh toán</h2>
                <div className="p-4 border-2 border-incanto-primary bg-incanto-bg-main/20 rounded-xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <QrCode className="w-8 h-8 text-incanto-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-base sm:text-lg text-incanto-dark">SePay (VietQR & Chuyển khoản)</p>
                      <p className="text-sm text-gray-600">Thanh toán qua VietQR hoặc chuyển khoản ngân hàng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 sticky top-24">
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-incanto-dark">Đơn hàng của bạn</h2>

                {/* Order items */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base text-incanto-dark truncate">{item.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">x {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm sm:text-base text-incanto-dark flex-shrink-0">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t pt-3 sm:pt-4 space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span className="text-incanto-dark">Tổng cộng:</span>
                      <span className="text-incanto-accent">
                        {orderTotal.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="btn-primary w-full text-sm sm:text-lg py-3 sm:py-4 flex items-center justify-center space-x-2 min-h-[48px] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <span>Tiếp tục thanh toán</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>

                {/* Terms */}
                <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
                  Bằng việc đặt hàng, bạn đồng ý với
                  <a href="#" className="text-incanto-primary hover:text-incanto-accent hover:underline transition-colors"> điều khoản dịch vụ</a>
                  {' '}và{' '}
                  <a href="#" className="text-incanto-primary hover:text-incanto-accent hover:underline transition-colors">chính sách bảo mật</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 'payment' && sepayData && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-incanto-dark mb-2">Đơn hàng đã được tạo!</h2>
                <p className="text-gray-600">Mã đơn hàng: <span className="font-semibold">{orderId}</span></p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Chi tiết đơn hàng</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khách hàng:</span>
                    <span className="font-medium">{customerInfo.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="font-medium">{customerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="font-bold text-incanto-accent">{orderTotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>

              {/* SePay Payment Form */}
              <form
                ref={formRef}
                action={sepayData.checkoutUrl}
                method="POST"
              >
                {/* Hidden form fields from SePay */}
                {Object.entries(sepayData.formFields).map(([field, value]) => (
                  <input key={field} type="hidden" name={field} value={String(value ?? '')} />
                ))}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <QrCode className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Thanh toán qua SePay</p>
                      <p className="text-sm text-blue-600 mt-1">
                        Bạn sẽ được chuyển đến trang thanh toán an toàn của SePay để hoàn tất giao dịch.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleProceedToPayment}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2"
                >
                  <span>Thanh toán ngay</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                Thanh toán được bảo mật bởi <span className="font-semibold text-incanto-primary">SePay</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
