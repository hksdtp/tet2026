import { NextRequest, NextResponse } from 'next/server'
import { validateSepayConfig } from '@/lib/env'
import crypto from 'crypto'

interface WebhookPayload {
  id: number
  gateway: string
  transactionDate: string
  accountNumber: string
  code: string | null
  content: string
  transferType: string
  transferAmount: number
  accumulated: number
  subAccount: string | null
  referenceCode: string
  description: string
}

// Verify webhook signature from SePay
function verifySignature(payload: string, signature: string, secretKey: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(payload)
    .digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(request: NextRequest) {
  try {
    const config = validateSepayConfig()

    // Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('x-sepay-signature') || ''

    // Verify signature if webhook secret is configured
    if (config.webhookSecret && config.webhookSecret !== 'your_webhook_secret_here') {
      if (!verifySignature(rawBody, signature, config.webhookSecret)) {
        console.error('Invalid webhook signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }

    const payload: WebhookPayload = JSON.parse(rawBody)

    console.log('SePay Webhook received:', {
      id: payload.id,
      amount: payload.transferAmount,
      content: payload.content,
      referenceCode: payload.referenceCode,
    })

    // Extract order ID from content or referenceCode
    // Format expected: "INCANTO-{timestamp}" trong content
    const orderIdMatch = payload.content?.match(/INCANTO-\d+/) ||
                         payload.referenceCode?.match(/INCANTO-\d+/)
    const orderId = orderIdMatch ? orderIdMatch[0] : null

    if (orderId) {
      // TODO: Update order status in your database
      // For now, just log it
      console.log(`Payment confirmed for order: ${orderId}`)
      console.log(`Amount: ${payload.transferAmount.toLocaleString('vi-VN')} VND`)

      // You can call your Google Sheet API here to update order status
      // Or update your database directly
    }

    // Return success response to SePay
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      orderId: orderId,
    })

  } catch (error) {
    console.error('SePay webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle GET request for webhook verification (if SePay requires it)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const challenge = searchParams.get('challenge')

  if (challenge) {
    return new NextResponse(challenge)
  }

  return NextResponse.json({ status: 'Webhook endpoint active' })
}
