'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ProductBadge } from '@/types'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </span>
  )
}

// Product Badge Component
interface ProductBadgeComponentProps {
  badge: ProductBadge
  className?: string
  animated?: boolean
}

export function ProductBadgeComponent({
  badge,
  className = '',
  animated = true
}: ProductBadgeComponentProps) {
  const badgeConfig: Record<ProductBadge, { bg: string; text: string }> = {
    'Best Seller': { bg: 'bg-incanto-primary', text: 'text-white' },
    'Limited': { bg: 'bg-purple-500', text: 'text-white' },
    'New': { bg: 'bg-incanto-leaf', text: 'text-white' },
    'Premium': { bg: 'bg-incanto-accent', text: 'text-incanto-dark' },
    'Exclusive': { bg: 'bg-incanto-dark', text: 'text-white' },
    'Sale': { bg: 'bg-rose-500', text: 'text-white' }
  }

  const config = badgeConfig[badge]
  const Component = animated ? motion.span : 'span'
  
  const animationProps = animated ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <Component
      className={`
        inline-flex items-center px-3 py-1 rounded-full
        text-xs font-semibold
        ${config.bg} ${config.text}
        ${className}
      `}
      {...animationProps}
    >
      {badge}
    </Component>
  )
}

// Discount Badge
interface DiscountBadgeProps {
  percent: number
  className?: string
}

export function DiscountBadge({ percent, className = '' }: DiscountBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        inline-flex items-center px-2 py-1 rounded-lg
        bg-rose-500 text-white text-xs font-bold
        ${className}
      `}
    >
      -{percent}%
    </motion.span>
  )
}

// Stock Badge
interface StockBadgeProps {
  inStock: boolean
  className?: string
}

export function StockBadge({ inStock, className = '' }: StockBadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 text-sm
      ${inStock ? 'text-green-600' : 'text-red-500'}
      ${className}
    `}>
      <span className={`
        w-2 h-2 rounded-full
        ${inStock ? 'bg-green-500' : 'bg-red-500'}
      `} />
      {inStock ? 'Còn hàng' : 'Hết hàng'}
    </span>
  )
}

// Count Badge (for cart, notifications)
interface CountBadgeProps {
  count: number
  max?: number
  className?: string
}

export function CountBadge({ count, max = 99, className = '' }: CountBadgeProps) {
  if (count === 0) return null

  const displayCount = count > max ? `${max}+` : count

  return (
    <motion.span
      key={count}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      className={`
        absolute -top-1 -right-1
        min-w-[20px] h-5 px-1.5
        flex items-center justify-center
        bg-incanto-primary text-white
        text-xs font-bold rounded-full
        ${className}
      `}
    >
      {displayCount}
    </motion.span>
  )
}

