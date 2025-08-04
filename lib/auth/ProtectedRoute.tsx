"use client"

import { useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useRouter, usePathname } from 'next/navigation'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // If authenticated and on login page, redirect to home
      if (isAuthenticated && pathname === '/login') {
        router.push('/')
        return
      }

      // If not authenticated and not on login page, redirect to login
      if (!isAuthenticated && pathname !== '/login') {
        router.push('/login')
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  if (isLoading) {
    return null // or return a loading spinner
  }

  // Always render children on login page
  if (pathname === '/login') {
    return <>{children}</>
  }

  // For other routes, only render when authenticated
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
