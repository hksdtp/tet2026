'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isLoaded: boolean
}

type CartAction =
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }

interface CartContextType {
  items: CartItem[]
  isLoaded: boolean
  itemCount: number
  subtotal: number
  discount: number
  shipping: number
  total: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
  getItemQuantity: (id: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'incanto-cart'
const FREE_SHIPPING_THRESHOLD = 2000000
const SHIPPING_FEE = 30000

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload, isLoaded: true }
    
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1) return state
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    
    case 'CLEAR_CART':
      return { ...state, items: [] }
    
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isLoaded: false })

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: items })
      } catch {
        dispatch({ type: 'LOAD_CART', payload: [] })
      }
    } else {
      dispatch({ type: 'LOAD_CART', payload: [] })
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    }
  }, [state.items, state.isLoaded])

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )
  
  const discount = state.items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)
  
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const addItem = (product: Product, quantity = 1) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity,
      capacity: product.capacity,
      inStock: product.inStock
    }
    dispatch({ type: 'ADD_ITEM', payload: cartItem })
  }

  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  
  const updateQuantity = (id: number, quantity: number) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  
  const isInCart = (id: number) => state.items.some(item => item.id === id)
  
  const getItemQuantity = (id: number) => 
    state.items.find(item => item.id === id)?.quantity || 0

  return (
    <CartContext.Provider value={{
      items: state.items,
      isLoaded: state.isLoaded,
      itemCount,
      subtotal,
      discount,
      shipping,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

