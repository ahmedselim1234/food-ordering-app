import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState, Extra } from '@/types'
import { validDiscountCodes } from '@/data/offersData'

const initialState: CartState = {
  items: [],
  discountCode: '',
  discountAmount: 0,
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const incoming = action.payload
      const existingIdx = state.items.findIndex(
        item =>
          item.foodItem.id === incoming.foodItem.id &&
          JSON.stringify(item.selectedExtras.map(e => e.id).sort()) ===
          JSON.stringify(incoming.selectedExtras.map(e => e.id).sort())
      )
      if (existingIdx >= 0) {
        state.items[existingIdx].quantity += incoming.quantity
      } else {
        state.items.push(incoming)
      }
      state.isOpen = true
    },
    removeItem: (state, action: PayloadAction<{ foodItemId: string; extraIds: string[] }>) => {
      state.items = state.items.filter(
        item =>
          !(
            item.foodItem.id === action.payload.foodItemId &&
            JSON.stringify(item.selectedExtras.map((e: Extra) => e.id).sort()) ===
            JSON.stringify(action.payload.extraIds.sort())
          )
      )
    },
    updateQuantity: (state, action: PayloadAction<{ index: number; qty: number }>) => {
      if (action.payload.qty <= 0) {
        state.items.splice(action.payload.index, 1)
      } else {
        state.items[action.payload.index].quantity = action.payload.qty
      }
    },
    applyDiscount: (state, action: PayloadAction<{ code: string; subtotal: number }>) => {
      const code = action.payload.code.toUpperCase()
      const discount = validDiscountCodes[code]
      if (discount && action.payload.subtotal >= discount.minOrder) {
        state.discountCode = code
        state.discountAmount = Math.round((action.payload.subtotal * discount.percent) / 100 * 100) / 100
      } else {
        state.discountCode = ''
        state.discountAmount = 0
      }
    },
    removeDiscount: (state) => {
      state.discountCode = ''
      state.discountAmount = 0
    },
    clearCart: (state) => {
      state.items = []
      state.discountCode = ''
      state.discountAmount = 0
    },
    openCart: (state) => { state.isOpen = true },
    closeCart: (state) => { state.isOpen = false },
    toggleCart: (state) => { state.isOpen = !state.isOpen },
  },
})

export const { addItem, removeItem, updateQuantity, applyDiscount, removeDiscount, clearCart, openCart, closeCart, toggleCart } = cartSlice.actions
export default cartSlice.reducer
