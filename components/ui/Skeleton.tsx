'use client'

import { ReactNode } from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'shimmer' | 'none'
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer'
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl'
  }

  const animationClasses = {
    pulse: 'animate-pulse bg-gray-200',
    shimmer: 'skeleton-shimmer',
    none: 'bg-gray-200'
  }

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={style}
    />
  )
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <Skeleton 
        variant="rectangular" 
        className="aspect-square w-full" 
      />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" height={20} className="w-3/4" />
        <Skeleton variant="text" height={16} className="w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" height={24} className="w-1/3" />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </div>
    </div>
  )
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Cart Item Skeleton
export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl">
      <Skeleton variant="rounded" width={80} height={80} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height={20} className="w-3/4" />
        <Skeleton variant="text" height={16} className="w-1/2" />
        <Skeleton variant="text" height={24} className="w-1/4" />
      </div>
    </div>
  )
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-3xl">
        <Skeleton variant="rounded" width={200} height={40} className="mx-auto" />
        <Skeleton variant="text" height={60} className="w-full" />
        <Skeleton variant="text" height={60} className="w-3/4 mx-auto" />
        <div className="space-y-3 pt-4">
          <Skeleton variant="text" height={24} className="w-full" />
          <Skeleton variant="text" height={24} className="w-2/3 mx-auto" />
        </div>
        <div className="flex justify-center gap-4 pt-6">
          <Skeleton variant="rounded" width={160} height={50} />
          <Skeleton variant="rounded" width={160} height={50} />
        </div>
      </div>
    </div>
  )
}

// Text Block Skeleton
interface TextBlockSkeletonProps {
  lines?: number
  className?: string
}

export function TextBlockSkeleton({ lines = 3, className = '' }: TextBlockSkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          height={16} 
          className={i === lines - 1 ? 'w-2/3' : 'w-full'} 
        />
      ))}
    </div>
  )
}

// Avatar Skeleton
export function AvatarSkeleton({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />
}

// Image Skeleton with aspect ratio
interface ImageSkeletonProps {
  aspectRatio?: 'square' | 'video' | 'portrait'
  className?: string
}

export function ImageSkeleton({ 
  aspectRatio = 'square', 
  className = '' 
}: ImageSkeletonProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  }

  return (
    <Skeleton 
      variant="rounded" 
      className={`w-full ${aspectClasses[aspectRatio]} ${className}`} 
    />
  )
}

