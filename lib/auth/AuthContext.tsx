/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { createContext, useContext, useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { AUTH_CONFIG } from './config'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<{
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => { }
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_CONFIG.SESSION_KEY) {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const checkAuth = () => {
    const token = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY) || getCookie(AUTH_CONFIG.SESSION_KEY);
    setIsAuthenticated(!!token)

    // If token exists in cookie but not in sessionStorage, sync it
    if (!sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY) && token) {
      sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, token);
    }

    setIsLoading(false)
  }

  // Helper function to get cookie value
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  }

  const login = async (username: string, password: string) => {
    if (username === AUTH_CONFIG.USERNAME && password === AUTH_CONFIG.PASSWORD_HASH) {
      const token = btoa(Date.now().toString())
      sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, token)
      // Set cookie with a longer expiration (e.g., 7 days)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      document.cookie = `${AUTH_CONFIG.SESSION_KEY}=${token}; path=/; expires=${expiryDate.toUTCString()}`;
      setIsAuthenticated(true)
      router.push('/')
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY)
    // Remove the cookie as well
    document.cookie = `${AUTH_CONFIG.SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

/*

const checkAuth = () => {
  const token = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY)
  const sessionTimestamp = sessionStorage.getItem('session_timestamp')
  
  if (token && sessionTimestamp) {
    const now = Date.now()
    const sessionStart = parseInt(sessionTimestamp)
    
    if (now - sessionStart > AUTH_CONFIG.SESSION_DURATION) {
      // Session expired
      logout()
      return
    }
    setIsAuthenticated(true)
  } else {
    setIsAuthenticated(false)
  }
  setIsLoading(false)
}

const login = async (username: string, password: string) => {
  if (username === AUTH_CONFIG.USERNAME && password === AUTH_CONFIG.PASSWORD_HASH) {
    const token = btoa(Date.now().toString())
    sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, token)
    sessionStorage.setItem('session_timestamp', Date.now().toString())
    setIsAuthenticated(true)
    router.push('/')
    return true
  }
  return false
}


*/