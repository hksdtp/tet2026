'use client'

import { useState, useEffect } from 'react'
import { SepayClient, SepayCheckoutOptions, SepayCheckoutResponse } from '@/lib/sepay-client'
import { SepayError } from '@/lib/sepay-errors'
import { CreditCard, QrCode, Banknote, Loader2, AlertCircle } from 'lucide-react'

interface SepayCheckoutFormProps {
  orderId: string
  amount: number
  description: string
  customerInfo?: {
    name?: string
    email?: string
    phone?: string
  }
  paymentMethod?: 'BANK_TRANSFER' | 'NAPAS_BANK_TRANSFER'
  onSuccess?: (response: SepayCheckoutResponse) => void
  onError?: (error: Error) => void
}

export default function SepayCheckoutForm({
  orderId,
  amount,
  description,
  customerInfo = {},
  paymentMethod = 'BANK_TRANSFER',
  onSuccess,
  onError,
}: SepayCheckoutFormProps) {
  const [checkoutData, setCheckoutData] = useState<SepayCheckoutResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<'BANK_TRANSFER' | 'NAPAS_BANK_TRANSFER'>(paymentMethod)

  const paymentMethods = [
    {
      id: 'BANK_TRANSFER' as const,
      label: 'Chuyển khoản ngân hàng',
      icon: Banknote,
      description: 'Chuyển khoản qua Internet Banking',
    },
    {
      id: 'NAPAS_BANK_TRANSFER' as const,
      label: 'Chuyển khoản NAPAS',
      icon: CreditCard,
      description: 'Chuyển khoản qua cổng NAPAS',
    },
  ]

  useEffect(() => {
    initializeCheckout()
  }, [selectedMethod])

  const initializeCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const client = SepayClient.createFromEnv()
      const options: SepayCheckoutOptions = SepayClient.createCheckoutOptions(
        orderId,
        amount,
        description,
        customerInfo,
        selectedMethod
      )

      const response = client.initCheckout(options)
      setCheckoutData(response)
      onSuccess?.(response)
    } catch (err: any) {
      const errorMessage = err instanceof SepayError ? err.message : 'Không thể khởi tạo thanh toán'
      setError(errorMessage)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkoutData) {
      initializeCheckout()
    }
    // Form sẽ tự submit đến SePay checkout URL
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="w-8 h-8 text-incanto-primary animate-spin" />
        <p className="text-gray-600">Đang khởi tạo thanh toán...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">Lỗi thanh toán</p>
        </div>
        <p className="text-red-600 text-sm mt-2">{error}</p>
        <button
          onClick={initializeCheckout}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Thông tin đơn hàng</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Mã đơn hàng:</span>
            <span className="font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Số tiền:</span>
            <span className="font-bold text-incanto-accent">{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Mô tả:</span>
            <span className="text-right">{description}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Chọn phương thức thanh toán</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 border-2 rounded-xl text-left transition-colors ${
                  selectedMethod === method.id
                    ? 'border-incanto-primary bg-incanto-bg-main/20'
                    : 'border-gray-300 hover:border-incanto-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${selectedMethod === method.id ? 'text-incanto-primary' : 'text-gray-600'}`} />
                  <div>
                    <p className="font-medium text-gray-800">{method.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{method.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Checkout Form */}
      {checkoutData && (
        <form
          action={checkoutData.checkoutUrl}
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">Sẵn sàng thanh toán</p>
            </div>
            <p className="text-green-600 text-sm mt-2">
              Bạn sẽ được chuyển đến trang thanh toán an toàn của SePay
            </p>
          </div>

          {/* Hidden form fields */}
          {Object.entries(checkoutData.formFields).map(([field, value]) => (
            <input key={field} type="hidden" name={field} value={String(value ?? '')} />
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!checkoutData}
            className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
          >
            <span>Thanh toán với SePay</span>
            <CreditCard className="w-4 h-4" />
          </button>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Thanh toán được bảo mật bởi{' '}
              <span className="font-semibold text-incanto-primary">SePay</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Bằng việc thanh toán, bạn đồng ý với{' '}
              <a href="#" className="text-incanto-primary hover:underline">điều khoản dịch vụ</a>
            </p>
          </div>
        </form>
      )}

      {/* Manual Retry */}
      {!checkoutData && !loading && !error && (
        <button
          onClick={initializeCheckout}
          className="btn-secondary w-full py-3"
        >
          Khởi tạo thanh toán
        </button>
      )}
    </div>
  )
}