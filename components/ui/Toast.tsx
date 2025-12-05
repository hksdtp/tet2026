'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, ShoppingCart } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'cart'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  cartAdded: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const success = useCallback((message: string) => {
    addToast({ type: 'success', message })
  }, [addToast])

  const error = useCallback((message: string) => {
    addToast({ type: 'error', message })
  }, [addToast])

  const info = useCallback((message: string) => {
    addToast({ type: 'info', message })
  }, [addToast])

  const cartAdded = useCallback((message: string) => {
    addToast({ type: 'cart', message, duration: 2000 })
  }, [addToast])

  return (
    <ToastContext.Provider value={{ 
      toasts, addToast, removeToast, success, error, info, cartAdded 
    }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Toast Container
function ToastContainer({ 
  toasts, 
  removeToast 
}: { 
  toasts: Toast[]
  removeToast: (id: string) => void 
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onRemove={() => removeToast(toast.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Single Toast Item
function ToastItem({ 
  toast, 
  onRemove 
}: { 
  toast: Toast
  onRemove: () => void 
}) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    cart: <ShoppingCart className="w-5 h-5 text-incanto-primary" />
  }

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    cart: 'bg-incanto-light border-incanto-accent'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border
        shadow-lg min-w-[280px] max-w-[400px]
        ${bgColors[toast.type]}
      `}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-gray-800">
        {toast.message}
      </p>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-black/5 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  )
}

