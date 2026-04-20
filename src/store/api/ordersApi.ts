import { baseApi } from './baseApi'
import type { Order, CartItem, Address } from '@/types'

interface PlaceOrderRequest {
  items: CartItem[]
  address: Address
  paymentMethod: 'cash' | 'card'
  total: number
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    items: [],
    status: 'delivered',
    total: 52.47,
    address: { id: 'a1', label: 'Home', street: '123 Main Street', city: 'New York, NY' },
    paymentMethod: 'card',
    createdAt: '2026-04-15T18:30:00Z',
    estimatedTime: 30,
  },
  {
    id: 'ord-002',
    items: [],
    status: 'delivered',
    total: 38.99,
    address: { id: 'a1', label: 'Home', street: '123 Main Street', city: 'New York, NY' },
    paymentMethod: 'cash',
    createdAt: '2026-04-10T12:00:00Z',
    estimatedTime: 25,
  },
]

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<Order, PlaceOrderRequest>({
      queryFn: (arg) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const order: Order = {
              id: 'ord-' + Date.now(),
              items: arg.items,
              status: 'placed',
              total: arg.total,
              address: arg.address,
              paymentMethod: arg.paymentMethod,
              createdAt: new Date().toISOString(),
              estimatedTime: 30,
            }
            MOCK_ORDERS.unshift(order)
            resolve({ data: order })
          }, 1200)
        })
      },
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query<Order[], void>({
      queryFn: () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve({ data: [...MOCK_ORDERS] }), 500)
        })
      },
      providesTags: ['Orders'],
    }),
    trackOrder: builder.query<Order, string>({
      queryFn: (orderId) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const order = MOCK_ORDERS.find(o => o.id === orderId)
            if (order) {
              resolve({ data: order })
            } else {
              reject({ error: { status: 404, data: { message: 'Order not found' } } })
            }
          }, 400)
        })
      },
      providesTags: ['Orders'],
    }),
  }),
})

export const { usePlaceOrderMutation, useGetOrdersQuery, useTrackOrderQuery } = ordersApi
