'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hover Scale Animation
interface HoverScaleProps {
  children: ReactNode
  className?: string
  scale?: number
}

export function HoverScale({ children, className = '', scale = 1.02 }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hover Lift Animation
interface HoverLiftProps {
  children: ReactNode
  className?: string
  y?: number
}

export function HoverLift({ children, className = '', y = -8 }: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Press Animation
interface PressAnimationProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function PressAnimation({ children, className = '', onClick }: PressAnimationProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Parallax Wrapper
interface ParallaxProps {
  children: ReactNode
  className?: string
  offset?: number
}

export function Parallax({ children, className = '', offset = 50 }: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Reveal on Scroll
interface RevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export function Reveal({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0 
}: RevealProps) {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

