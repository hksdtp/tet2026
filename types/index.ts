// Product Types
export interface Product {
  id: number
  name: string
  slug: string
  sku?: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  category: ProductCategory
  badge?: ProductBadge
  inStock: boolean
  description?: string
  colorPalette?: string
  style?: string
  capacity?: string
  setIncludes?: string
  dimensions?: ProductDimensions
  material?: string
  packaging?: string
  origin?: string
}

export interface ProductDimensions {
  totalLength?: string
  teapotDiameter?: string
  saucerDiameter?: string
  teapotHeight?: string
  cupHeight?: string
}

export type ProductCategory =
  | 'teapots'      // Ấm trà
  | 'sets'         // Bộ sản phẩm
  | 'cups'         // Chén/Tách
  | 'trays'        // Khay
  | 'accessories'  // Phụ kiện
  | 'dishes'       // Bát đĩa
  | 'cutlery'      // Dao dĩa
  | 'gift-sets'    // Quà tặng Tết

export type ProductBadge = 
  | 'Best Seller' 
  | 'Limited' 
  | 'New' 
  | 'Premium' 
  | 'Exclusive' 
  | 'Sale'

// Cart Types
export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  capacity?: string
  inStock: boolean
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
}

// Order Types
export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  shipping: ShippingInfo
  payment: PaymentInfo
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

export interface ShippingInfo {
  address: string
  city: string
  district: string
  ward: string
  method: 'standard' | 'express'
  fee: number
}

export interface PaymentInfo {
  method: 'cod' | 'bank' | 'momo' | 'sepay'
  status: 'pending' | 'paid' | 'failed' | 'expired'
  sepayTransactionId?: string
  qrCodeUrl?: string
  bankAccount?: string
  bankName?: string
  accountName?: string
  amount?: number
  currency?: string
  expiresAt?: Date
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipping' 
  | 'delivered' 
  | 'cancelled'

// Collection Types
export interface Collection {
  id: number
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

// Filter Types
export interface ProductFilters {
  category: ProductCategory | 'all'
  priceRange: {
    min: number
    max: number
  }
  inStock?: boolean
  rating?: number
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// SePay Types
export interface SepayPaymentRequest {
  amount: number
  currency: string
  orderId: string
  description: string
  customerName: string
  customerEmail: string
  customerPhone: string
  returnUrl: string
  cancelUrl: string
}

export interface SepayPaymentResponse {
  success: boolean
  transactionId: string
  qrCodeUrl?: string
  bankAccount?: string
  bankName?: string
  accountName?: string
  expiresAt: string
  checkoutUrl?: string
}

export interface SepayWebhookPayload {
  event: 'payment.success' | 'payment.failed' | 'payment.expired'
  transactionId: string
  orderId: string
  amount: number
  currency: string
  timestamp: string
  signature: string
}

export interface SepayBankInfo {
  bankCode: string
  bankName: string
  accountNumber: string
  accountName: string
  branch?: string
}

export interface SepayQrCode {
  url: string
  imageUrl: string
  content: string
}

export interface SepayPaymentDetails {
  transactionId: string
  status: 'pending' | 'paid' | 'failed' | 'expired'
  amount: number
  currency: string
  paymentMethod: 'qr' | 'bank_transfer'
  bankInfo?: SepayBankInfo
  qrCode?: SepayQrCode
  expiresAt: Date
  paidAt?: Date
}

// SePay PG SDK Types
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
  formFields: Record<string, string>
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

