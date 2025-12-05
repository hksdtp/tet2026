import { NextRequest, NextResponse } from 'next/server'
import { SepayClient } from '@/lib/sepay-client'
import { SepayError } from '@/lib/sepay-errors'
import { isSepayConfigured } from '@/lib/env'

interface CheckoutRequest {
  orderId: string
  amount: number
  description: string
  customerInfo?: {
    name?: string
    email?: string
    phone?: string
  }
  paymentMethod?: 'BANK_TRANSFER' | 'NAPAS_BANK_TRANSFER'
}

export async function POST(request: NextRequest) {
  try {
    // Check if SePay is configured
    if (!isSepayConfigured()) {
      return NextResponse.json(
        { error: 'Cổng thanh toán SePay chưa được cấu hình' },
        { status: 503 }
      )
    }

    const body: CheckoutRequest = await request.json()

    // Validate required fields
    if (!body.orderId || !body.amount || !body.description) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: orderId, amount, description' },
        { status: 400 }
      )
    }

    if (body.amount <= 0) {
      return NextResponse.json(
        { error: 'Số tiền thanh toán phải lớn hơn 0' },
        { status: 400 }
      )
    }

    // Create SePay client and initialize checkout
    const client = SepayClient.createFromEnv()
    const checkoutOptions = SepayClient.createCheckoutOptions(
      body.orderId,
      body.amount,
      body.description,
      body.customerInfo || {},
      body.paymentMethod || 'BANK_TRANSFER'
    )

    const checkoutResponse = client.initCheckout(checkoutOptions)

    return NextResponse.json({
      checkoutUrl: checkoutResponse.checkoutUrl,
      formFields: checkoutResponse.formFields,
      transactionId: checkoutResponse.transactionId,
      orderId: body.orderId,
    })

  } catch (error) {
    console.error('SePay checkout error:', error)

    if (error instanceof SepayError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode || 400 }
      )
    }

    return NextResponse.json(
      { error: 'Không thể khởi tạo thanh toán' },
      { status: 500 }
    )
  }
}
