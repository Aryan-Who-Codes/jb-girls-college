'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/auth/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(username, password)
    if (!success) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md px-4 sm:px-8 py-6 sm:py-10 bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">JB Girls College</h1>
          <p className="text-sm sm:text-base text-gray-600">Fee Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-200 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-200 text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 text-white py-2.5 sm:py-3 rounded-md sm:rounded-lg font-medium hover:from-violet-600 hover:to-violet-700 transition duration-200 shadow-md hover:shadow-lg text-sm sm:text-base mt-6"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
          Protected Administrative Portal
        </div>
      </div>
    </div>
  )
}