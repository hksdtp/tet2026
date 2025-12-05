'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface FlyingItem {
  id: string
  image: string
  startX: number
  startY: number
  endX: number
  endY: number
}

interface CartAnimationContextType {
  triggerAnimation: (image: string, startElement: HTMLElement) => void
  setCartIconRef: (ref: HTMLElement | null) => void
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined)

export function CartAnimationProvider({ children }: { children: ReactNode }) {
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([])
  const [cartIconRef, setCartIconRef] = useState<HTMLElement | null>(null)

  const triggerAnimation = useCallback((image: string, startElement: HTMLElement) => {
    if (!cartIconRef) return

    const startRect = startElement.getBoundingClientRect()
    const endRect = cartIconRef.getBoundingClientRect()

    const newItem: FlyingItem = {
      id: `${Date.now()}-${Math.random()}`,
      image,
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
    }

    setFlyingItems(prev => [...prev, newItem])

    // Remove after animation completes
    setTimeout(() => {
      setFlyingItems(prev => prev.filter(item => item.id !== newItem.id))
    }, 800)
  }, [cartIconRef])

  return (
    <CartAnimationContext.Provider value={{ triggerAnimation, setCartIconRef }}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {flyingItems.map(item => (
            <motion.div
              key={item.id}
              initial={{
                position: 'fixed',
                left: item.startX - 30,
                top: item.startY - 30,
                width: 60,
                height: 60,
                opacity: 1,
                scale: 1,
                zIndex: 9999,
                pointerEvents: 'none',
              }}
              animate={{
                left: item.endX - 15,
                top: item.endY - 15,
                width: 30,
                height: 30,
                opacity: 0.8,
                scale: 0.3,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0, 0.67, 0],
              }}
              className="rounded-full overflow-hidden shadow-2xl border-2 border-white"
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </AnimatePresence>,
        document.body
      )}
      {/* Cart icon bounce effect */}
      {typeof window !== 'undefined' && flyingItems.length > 0 && cartIconRef && createPortal(
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{
            position: 'fixed',
            left: cartIconRef.getBoundingClientRect().left,
            top: cartIconRef.getBoundingClientRect().top,
            width: cartIconRef.getBoundingClientRect().width,
            height: cartIconRef.getBoundingClientRect().height,
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        />,
        document.body
      )}
    </CartAnimationContext.Provider>
  )
}

export function useCartAnimation() {
  const context = useContext(CartAnimationContext)
  if (!context) {
    throw new Error('useCartAnimation must be used within a CartAnimationProvider')
  }
  return context
}

