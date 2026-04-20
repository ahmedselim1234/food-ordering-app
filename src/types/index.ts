export interface Extra {
  id: string
  name: string
  price: number
}

export interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  isAvailable: boolean
  extras?: Extra[]
  tags?: string[]
  prepTime?: number
}

export interface CartItem {
  foodItem: FoodItem
  quantity: number
  selectedExtras: Extra[]
  notes?: string
}

export type OrderStatus = 'placed' | 'preparing' | 'on_the_way' | 'delivered'

export interface Address {
  id: string
  label: string
  street: string
  city: string
}

export interface Order {
  id: string
  items: CartItem[]
  status: OrderStatus
  total: number
  address: Address
  paymentMethod: 'cash' | 'card'
  createdAt: string
  estimatedTime?: number
}

export interface User {
  id: string
  name: string
  phone: string
  email: string
  addresses: Address[]
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
  count?: number
}

export interface Offer {
  id: string
  title: string
  description: string
  discountCode: string
  discountPercent: number
  image: string
  validUntil: string
  minOrder: number
}

export interface CartState {
  items: CartItem[]
  discountCode: string
  discountAmount: number
  isOpen: boolean
}

export interface OrderState {
  currentOrder: Order | null
  orders: Order[]
}
