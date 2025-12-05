'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/contexts/CartContext'
import { CartAnimationProvider } from '@/contexts/CartAnimationContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <CartAnimationProvider>
        {children}
      </CartAnimationProvider>
    </CartProvider>
  )
}

