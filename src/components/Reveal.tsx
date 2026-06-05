import { motion, type Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay: i * 0.1 },
  }),
}

interface RevealProps extends PropsWithChildren {
  /** stagger index — each unit adds 100ms delay */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'figure' | 'p' | 'h2'
}

/** Scroll-triggered fade/rise reveal. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </Tag>
  )
}
