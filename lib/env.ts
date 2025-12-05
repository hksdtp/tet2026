/**
 * Environment configuration utilities for SePay integration
 */

export function getSepayConfig() {
  return {
    env: process.env.SEPAY_ENV as 'sandbox' | 'production' | undefined,
    merchantId: process.env.SEPAY_MERCHANT_ID,
    secretKey: process.env.SEPAY_SECRET_KEY,
    webhookSecret: process.env.SEPAY_WEBHOOK_SECRET,
  }
}

export function validateSepayConfig(): {
  env: 'sandbox' | 'production'
  merchantId: string
  secretKey: string
  webhookSecret: string
} {
  const config = getSepayConfig()
  const missing: string[] = []

  if (!config.env) missing.push('SEPAY_ENV')
  if (!config.merchantId) missing.push('SEPAY_MERCHANT_ID')
  if (!config.secretKey) missing.push('SEPAY_SECRET_KEY')
  if (!config.webhookSecret) missing.push('SEPAY_WEBHOOK_SECRET')

  if (missing.length > 0) {
    throw new Error(`Missing SePay configuration: ${missing.join(', ')}`)
  }

  if (config.env !== 'sandbox' && config.env !== 'production') {
    throw new Error(`Invalid SEPAY_ENV: ${config.env}. Must be 'sandbox' or 'production'`)
  }

  return {
    env: config.env,
    merchantId: config.merchantId!,
    secretKey: config.secretKey!,
    webhookSecret: config.webhookSecret!,
  }
}

export function isSepayConfigured(): boolean {
  try {
    validateSepayConfig()
    return true
  } catch {
    return false
  }
}

export function getSepayConfigForClient() {
  const config = validateSepayConfig()
  return {
    env: config.env,
    merchantId: config.merchantId,
  }
}

/**
 * Development environment helpers
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test'
}

/**
 * Get application base URL for webhooks and callbacks
 */
export function getAppBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (isDevelopment()) {
    return 'http://localhost:3000'
  }

  throw new Error('Application base URL not configured')
}