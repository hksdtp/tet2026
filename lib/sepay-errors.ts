export class SepayError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'SepayError'
  }
}

export const SEPAY_ERRORS = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  PAYMENT_FAILED: 'payment_failed',
  NETWORK_ERROR: 'network_error',
  VALIDATION_ERROR: 'validation_error',
  WEBHOOK_VERIFICATION_FAILED: 'webhook_verification_failed',
  TRANSACTION_NOT_FOUND: 'transaction_not_found',
  INSUFFICIENT_BALANCE: 'insufficient_balance',
  BANK_TRANSFER_FAILED: 'bank_transfer_failed',
  QR_CODE_GENERATION_FAILED: 'qr_code_generation_failed',
} as const

export type SepayErrorCode = typeof SEPAY_ERRORS[keyof typeof SEPAY_ERRORS]