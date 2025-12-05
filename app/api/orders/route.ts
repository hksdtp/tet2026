import { NextRequest, NextResponse } from 'next/server'

interface OrderData {
  timestamp: string
  orderId: string
  customerName: string
  phone: string
  email: string
  address: string
  note: string
  items: string
  total: number
  paymentMethod: string
}

// Google Sheets API endpoint
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || ''

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json()

    // Validate required fields
    if (!orderData.customerName || !orderData.phone) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: Họ tên và số điện thoại' },
        { status: 400 }
      )
    }

    // Lưu vào Google Sheet qua Google Apps Script Web App
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: orderData.timestamp,
            orderId: orderData.orderId,
            customerName: orderData.customerName,
            phone: orderData.phone,
            email: orderData.email || '',
            address: orderData.address || '',
            note: orderData.note || '',
            items: orderData.items,
            total: orderData.total,
            paymentMethod: orderData.paymentMethod,
          }),
        })

        if (!response.ok) {
          console.error('Google Sheet error:', await response.text())
        }
      } catch (sheetError) {
        console.error('Failed to save to Google Sheet:', sheetError)
        // Continue - don't fail the order if sheet fails
      }
    }

    // Log order for debugging
    console.log('New Order:', orderData)

    return NextResponse.json({
      success: true,
      message: 'Đơn hàng đã được tạo thành công',
      orderId: orderData.orderId,
    })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Không thể xử lý đơn hàng' },
      { status: 500 }
    )
  }
}

