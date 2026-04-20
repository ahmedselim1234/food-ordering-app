import { Minus, Plus, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { removeItem, updateQuantity } from '@/store/slices/cartSlice'
import type { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  item: CartItemType
  index: number
}

export default function CartItem({ item, index }: Props) {
  const dispatch = useAppDispatch()
  const extrasTotal = item.selectedExtras.reduce((s, e) => s + e.price, 0)
  const lineTotal = (item.foodItem.price + extrasTotal) * item.quantity

  return (
    <div className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
      <img src={item.foodItem.image} alt={item.foodItem.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm">{item.foodItem.name}</p>
        {item.selectedExtras.length > 0 && (
          <p className="text-xs text-zinc-500 mt-0.5">+ {item.selectedExtras.map(e => e.name).join(', ')}</p>
        )}
        {item.notes && <p className="text-xs text-zinc-600 mt-0.5 italic">"{item.notes}"</p>}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(updateQuantity({ index, qty: item.quantity - 1 }))}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-semibold text-white">{item.quantity}</span>
            <button
              onClick={() => dispatch(updateQuantity({ index, qty: item.quantity + 1 }))}
              className="w-7 h-7 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-400 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-400">{formatPrice(lineTotal)}</span>
            <button
              onClick={() => dispatch(removeItem({ foodItemId: item.foodItem.id, extraIds: item.selectedExtras.map(e => e.id) }))}
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
