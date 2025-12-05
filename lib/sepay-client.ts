import { SePayPgClient } from 'sepay-pg-node'
import { SepayError, SEPAY_ERRORS } from './sepay-errors'
import { validateSepayConfig } from './env'

// Types for SePay PG SDK
export interface SepayCheckoutOptions {
  payment_method: 'BANK_TRANSFER' | 'NAPAS_BANK_TRANSFER'
  order_invoice_number: string
  order_amount: number
  currency: 'VND' | 'USD'
  order_description: string
  success_url: string
  error_url: string
  cancel_url: string
  customer_name?: string
  customer_email?: string
  customer_phone?: string
}

export interface SepayCheckoutResponse {
  checkoutUrl: string
  formFields: Record<string, unknown>
  transactionId?: string
}

export interface SepayWebhookData {
  transaction_id: string
  order_invoice_number: string
  amount: number
  currency: string
  status: 'success' | 'failed' | 'pending'
  payment_method: string
  timestamp: string
  signature: string
}

export class SepayClient {
  private client: SePayPgClient

  constructor(
    private env: 'sandbox' | 'production',
    private merchantId: string,
    private secretKey: string
  ) {
    if (!merchantId || !secretKey) {
      throw new SepayError(
        'SePay merchant credentials are required',
        SEPAY_ERRORS.INVALID_CREDENTIALS
      )
    }

    try {
      this.client = new SePayPgClient({
        env: this.env,
        merchant_id: this.merchantId,
        secret_key: this.secretKey,
      })
    } catch (error: any) {
      throw new SepayError(
        `Failed to initialize SePay client: ${error.message}`,
        SEPAY_ERRORS.INVALID_CREDENTIALS
      )
    }
  }

  /**
   * Initialize checkout for one-time payment
   */
  initCheckout(options: SepayCheckoutOptions): SepayCheckoutResponse {
    try {
      this.validateCheckoutOptions(options)

      const checkoutURL = this.client.checkout.initCheckoutUrl()
      const formFields = this.client.checkout.initOneTimePaymentFields({
        payment_method: options.payment_method,
        order_invoice_number: options.order_invoice_number,
        order_amount: options.order_amount,
        currency: options.currency,
        order_description: options.order_description,
        success_url: options.success_url,
        error_url: options.error_url,
        cancel_url: options.cancel_url,
      })

      return {
        checkoutUrl: checkoutURL,
        formFields,
        transactionId: this.extractTransactionId(formFields),
      }
    } catch (error: any) {
      if (error instanceof SepayError) {
        throw error
      }
      throw new SepayError(
        error.message || 'Failed to initialize checkout',
        SEPAY_ERRORS.PAYMENT_FAILED
      )
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhook(data: any, signature: string): boolean {
    const config = validateSepayConfig()

    // Note: SePay PG SDK might have built-in webhook verification
    // For now, we'll implement basic signature verification
    // This should be updated based on SePay documentation
    try {
      // Simple validation - in production, use proper signature verification
      // based on SePay webhook documentation
      return true // Placeholder - update with actual verification
    } catch (error) {
      throw new SepayError(
        'Webhook verification failed',
        SEPAY_ERRORS.WEBHOOK_VERIFICATION_FAILED
      )
    }
  }

  /**
   * Get payment status (if supported by SDK)
   */
  async getPaymentStatus(transactionId: string): Promise<any> {
    if (!transactionId) {
      throw new SepayError(
        'Transaction ID is required',
        SEPAY_ERRORS.VALIDATION_ERROR
      )
    }

    // Note: Check SePay PG SDK documentation for status checking
    // This is a placeholder implementation
    throw new SepayError(
      'Payment status checking not implemented in PG SDK',
      SEPAY_ERRORS.TRANSACTION_NOT_FOUND
    )
  }

  /**
   * Validate checkout options
   */
  private validateCheckoutOptions(options: SepayCheckoutOptions): void {
    const errors: string[] = []

    if (!options.payment_method) {
      errors.push('Payment method is required')
    }
    if (!options.order_invoice_number) {
      errors.push('Order invoice number is required')
    }
    if (!options.order_amount || options.order_amount <= 0) {
      errors.push('Order amount must be greater than 0')
    }
    if (!options.currency) {
      errors.push('Currency is required')
    }
    if (!options.order_description) {
      errors.push('Order description is required')
    }
    if (!options.success_url) {
      errors.push('Success URL is required')
    }
    if (!options.error_url) {
      errors.push('Error URL is required')
    }
    if (!options.cancel_url) {
      errors.push('Cancel URL is required')
    }

    if (errors.length > 0) {
      throw new SepayError(
        `Invalid checkout options: ${errors.join(', ')}`,
        SEPAY_ERRORS.VALIDATION_ERROR
      )
    }
  }

  /**
   * Extract transaction ID from form fields
   */
  private extractTransactionId(formFields: Record<string, unknown>): string | undefined {
    // Try to find transaction ID in form fields
    // This depends on SePay PG SDK response structure
    const txnId = formFields['transaction_id'] || formFields['txn_id']
    return typeof txnId === 'string' ? txnId : undefined
  }

  /**
   * Static factory method to create client from environment variables
   */
  static createFromEnv(): SepayClient {
    const config = validateSepayConfig()
    return new SepayClient(config.env, config.merchantId, config.secretKey)
  }

  /**
   * Create checkout options from order data
   */
  static createCheckoutOptions(
    orderId: string,
    amount: number,
    description: string,
    customerInfo: {
      name?: string
      email?: string
      phone?: string
    } = {},
    paymentMethod: 'BANK_TRANSFER' | 'NAPAS_BANK_TRANSFER' = 'BANK_TRANSFER'
  ): SepayCheckoutOptions {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    return {
      payment_method: paymentMethod,
      order_invoice_number: orderId,
      order_amount: amount,
      currency: 'VND',
      order_description: description,
      success_url: `${baseUrl}/checkout/success?order=${orderId}`,
      error_url: `${baseUrl}/checkout/error?order=${orderId}`,
      cancel_url: `${baseUrl}/checkout/cancel?order=${orderId}`,
    }
  }
}