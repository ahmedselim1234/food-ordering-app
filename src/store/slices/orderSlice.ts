import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Order, OrderState } from '@/types'

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
  },
})

export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions
export default orderSlice.reducer
