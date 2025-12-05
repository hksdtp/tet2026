'use client'

import { useCart as useCartContext } from '@/contexts/CartContext'
import { Product } from '@/types'
import { useState, useCallback } from 'react'

export function useCart() {
  return useCartContext()
}

// Hook for add to cart with feedback
export function useAddToCart() {
  const { addItem, isInCart, getItemQuantity } = useCartContext()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState<number | null>(null)

  const addToCart = useCallback(async (product: Product, quantity = 1) => {
    setIsAdding(true)
    setJustAdded(product.id)
    
    // Simulate slight delay for animation
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addItem(product, quantity)
    setIsAdding(false)
    
    // Reset justAdded after animation
    setTimeout(() => setJustAdded(null), 2000)
  }, [addItem])

  return {
    addToCart,
    isAdding,
    justAdded,
    isInCart,
    getItemQuantity
  }
}

// Hook for cart drawer/modal
export function useCartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const cart = useCartContext()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  return {
    ...cart,
    isOpen,
    open,
    close,
    toggle
  }
}

// Format price helper
export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫'
}

// Calculate savings
export function calculateSavings(price: number, originalPrice?: number): number {
  if (!originalPrice) return 0
  return originalPrice - price
}

// Calculate discount percentage
export function calculateDiscountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice) return 0
  return Math.round((1 - price / originalPrice) * 100)
}

