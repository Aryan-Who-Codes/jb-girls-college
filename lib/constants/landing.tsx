// File: /lib/constants/landing.ts
import { ReactNode } from 'react'
import { CreditCard, Clock, Shield, Zap } from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: ReactNode
}

interface Stat {
  value: string
  label: string
}

export const features: Feature[] = [
  {
    title: 'Easy Payments',
    description: 'Process fee payments quickly with multiple payment options including cards, UPI, and net banking.',
    icon: <CreditCard className="w-8 h-8 text-white" />
  },
  {
    title: 'Real-Time Updates',
    description: 'Get instant notifications and receipts for all transactions with detailed payment history.',
    icon: <Clock className="w-8 h-8 text-white" />
  },
  {
    title: 'Secure Transactions',
    description: 'Bank-level security with end-to-end encryption for all payments and personal information.',
    icon: <Shield className="w-8 h-8 text-white" />
  },
  {
    title: 'Fast Processing',
    description: 'Experience lightning-fast payment processing with minimal waiting times.',
    icon: <Zap className="w-8 h-8 text-white" />
  },
  {
    title: 'Payment Plans',
    description: 'Flexible payment plans allowing students to pay fees in installments based on their convenience.',
    icon: <CreditCard className="w-8 h-8 text-white" />
  },
  {
    title: 'Comprehensive Dashboard',
    description: 'View all pending and paid fees at a glance with our intuitive dashboard interface.',
    icon: <Shield className="w-8 h-8 text-white" />
  }
]

export const stats: Stat[] = [
  {
    value: '5,000+',
    label: 'Students'
  },
  {
    value: '98%',
    label: 'Collection Rate'
  },
  {
    value: '24/7',
    label: 'Support'
  },
  {
    value: '100%',
    label: 'Secure'
  }
]