'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'children'>

interface ButtonProps extends MotionButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium
    rounded-full cursor-pointer transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost text-gray-700 hover:text-incanto-primary',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-incanto-primary hover:text-incanto-primary bg-transparent'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {!isLoading && leftIcon && leftIcon}
      {children}
      {!isLoading && rightIcon && rightIcon}
    </motion.button>
  )
}

// Icon Button
interface IconButtonProps extends MotionButtonProps {
  icon: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  label: string
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const variantClasses = {
    primary: 'bg-incanto-primary text-white hover:bg-incanto-teal-dark',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-incanto-primary'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center justify-center rounded-full
        transition-colors duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={label}
      {...props}
    >
      {icon}
    </motion.button>
  )
}

// Add to Cart Button with Animation
interface AddToCartButtonProps {
  onClick: () => void
  isAdding?: boolean
  isAdded?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function AddToCartButton({
  onClick,
  isAdding = false,
  isAdded = false,
  disabled = false,
  size = 'md'
}: AddToCartButtonProps) {
  return (
    <Button
      variant="primary"
      size={size}
      onClick={onClick}
      isLoading={isAdding}
      disabled={disabled}
      className={isAdded ? 'bg-green-500 hover:bg-green-600' : ''}
    >
      {isAdded ? '✓ Đã thêm' : 'Thêm vào giỏ'}
    </Button>
  )
}

