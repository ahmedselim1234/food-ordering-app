import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { applyDiscount, removeDiscount } from '@/store/slices/cartSlice'
import { formatPrice } from '@/utils/formatPrice'
import { useToast } from '@/hooks/use-toast'
import { validDiscountCodes } from '@/data/offersData'

const DELIVERY_FEE = 3.99

export default function CartSummary() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { items, discountCode, discountAmount } = useAppSelector(s => s.cart)
  const [code, setCode] = useState('')

  const subtotal = items.reduce((sum, item) => {
    const extrasTotal = item.selectedExtras.reduce((s, e) => s + e.price, 0)
    return sum + (item.foodItem.price + extrasTotal) * item.quantity
  }, 0)

  const total = Math.max(0, subtotal - discountAmount + DELIVERY_FEE)

  const handleApply = () => {
    const upperCode = code.toUpperCase()
    const discount = validDiscountCodes[upperCode]
    if (!discount) {
      toast({ title: 'Invalid code', description: 'This discount code is not valid.', variant: 'destructive' })
      return
    }
    if (subtotal < discount.minOrder) {
      toast({ title: 'Min order not met', description: `This code requires a minimum of ${formatPrice(discount.minOrder)}`, variant: 'destructive' })
      return
    }
    dispatch(applyDiscount({ code: upperCode, subtotal }))
    toast({ title: 'Discount applied!', description: `${discount.percent}% off has been applied.` })
    setCode('')
  }

  return (
    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4 sticky top-24">
      <h3 className="font-semibold text-white text-lg">Order Summary</h3>

      {/* Discount */}
      {discountCode ? (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <span className="flex items-center gap-2 text-sm text-amber-400 font-mono font-bold">
            <Tag className="w-4 h-4" /> {discountCode}
          </span>
          <button onClick={() => dispatch(removeDiscount())} className="text-zinc-500 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Discount code"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
            className="bg-white/5 border-white/10 text-white placeholder-zinc-600 h-10 focus:border-amber-500/50"
          />
          <Button onClick={handleApply} variant="outline" size="sm" className="h-10 border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 px-4">
            Apply
          </Button>
        </div>
      )}

      <Separator className="bg-white/10" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-amber-400">
            <span>Discount</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-zinc-400">
          <span>Delivery fee</span>
          <span>{formatPrice(DELIVERY_FEE)}</span>
        </div>
        <Separator className="bg-white/10" />
        <div className="flex justify-between text-white font-bold text-base pt-1">
          <span>Total</span>
          <span className="text-amber-400">{formatPrice(total)}</span>
        </div>
      </div>

      <Button
        onClick={() => navigate('/checkout')}
        disabled={items.length === 0}
        className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-bold"
      >
        Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-center text-xs text-zinc-600">Free delivery on orders over $50</p>
    </div>
  )
}
