import { MapPin, CreditCard, Banknote, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Address, CartItem } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  items: CartItem[]
  address: Address
  paymentMethod: 'cash' | 'card'
  subtotal: number
  discountAmount: number
  total: number
  onPlace: () => void
  isLoading: boolean
}

export default function OrderSummary({ items, address, paymentMethod, subtotal, discountAmount, total, onPlace, isLoading }: Props) {
  const DELIVERY_FEE = 3.99

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {items.map((item, i) => {
          const extras = item.selectedExtras.reduce((s, e) => s + e.price, 0)
          return (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-zinc-400 flex-1 min-w-0 pr-2 truncate">
                {item.quantity}× {item.foodItem.name}
                {item.selectedExtras.length > 0 && <span className="text-zinc-600 ml-1">(+extras)</span>}
              </span>
              <span className="text-white font-medium flex-shrink-0">
                {formatPrice((item.foodItem.price + extras) * item.quantity)}
              </span>
            </div>
          )
        })}
      </div>

      <Separator className="bg-white/10" />

      {/* Address */}
      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
        <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-zinc-500">{address.label}</p>
          <p className="text-sm text-white">{address.street}</p>
          <p className="text-xs text-zinc-400">{address.city}</p>
        </div>
      </div>

      {/* Payment */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
        {paymentMethod === 'card' ? (
          <CreditCard className="w-4 h-4 text-amber-400 flex-shrink-0" />
        ) : (
          <Banknote className="w-4 h-4 text-amber-400 flex-shrink-0" />
        )}
        <span className="text-sm text-white capitalize">{paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}</span>
      </div>

      <Separator className="bg-white/10" />

      {/* Totals */}
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-amber-400">
            <span>Discount</span><span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-zinc-400">
          <span>Delivery</span><span>{formatPrice(DELIVERY_FEE)}</span>
        </div>
        <div className="flex justify-between text-white font-bold text-base pt-1">
          <span>Total</span><span className="text-amber-400">{formatPrice(total)}</span>
        </div>
      </div>

      <Button
        onClick={onPlace}
        disabled={isLoading}
        className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-bold"
      >
        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing order...</> : 'Place Order'}
      </Button>
    </div>
  )
}
