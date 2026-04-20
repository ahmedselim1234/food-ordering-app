import { baseApi } from './baseApi'
import type { User } from '@/types'

interface LoginRequest { email: string; password: string }
interface SignupRequest { name: string; phone: string; email: string; password: string }
interface AuthResponse { user: User; token: string }

const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  phone: '+1 555 0123',
  email: 'alex@example.com',
  addresses: [
    { id: 'a1', label: 'Home', street: '123 Main Street, Apt 4B', city: 'New York, NY 10001' },
    { id: 'a2', label: 'Work', street: '456 Business Ave, Floor 12', city: 'New York, NY 10002' },
  ],
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: (arg) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (arg.email && arg.password.length >= 6) {
              resolve({ data: { user: { ...MOCK_USER, email: arg.email }, token: 'mock-jwt-token-' + Date.now() } })
            } else {
              reject({ error: { status: 401, data: { message: 'Invalid credentials' } } })
            }
          }, 800)
        })
      },
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      queryFn: (arg) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                user: {
                  id: 'u' + Date.now(),
                  name: arg.name,
                  phone: arg.phone,
                  email: arg.email,
                  addresses: [],
                },
                token: 'mock-jwt-token-' + Date.now(),
              },
            })
          }, 1000)
        })
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: () => {
        return new Promise((resolve) => setTimeout(() => resolve({ data: undefined }), 200))
      },
    }),
  }),
})

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi
