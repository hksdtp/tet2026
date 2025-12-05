'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

// Animation Variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Transition presets
export const easeApple = [0.25, 0.1, 0.25, 1]
export const easeBounce = [0.68, -0.55, 0.265, 1.55]

interface AnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

// Fade In Up Component
export function FadeInUp({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  once = true,
  amount = 0.3
}: AnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration, delay, ease: easeApple }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade In Left Component
export function FadeInLeft({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  once = true,
  amount = 0.3
}: AnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInLeft}
      transition={{ duration, delay, ease: easeApple }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade In Right Component
export function FadeInRight({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  once = true,
  amount = 0.3
}: AnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInRight}
      transition={{ duration, delay, ease: easeApple }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale In Component
export function ScaleIn({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.5,
  once = true,
  amount = 0.3
}: AnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      transition={{ duration, delay, ease: easeBounce }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger Children Container
interface StaggerContainerProps extends AnimationProps {
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  amount = 0.2
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { 
            staggerChildren: staggerDelay, 
            delayChildren: delay 
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger Item
export function StaggerItem({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerItem}
      transition={{ duration: 0.5, ease: easeApple }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

