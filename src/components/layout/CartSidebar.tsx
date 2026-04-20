import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { closeCart, removeItem, updateQuantity } from '@/store/slices/cartSlice'
import { formatPrice } from '@/utils/formatPrice'

const DELIVERY_FEE = 3.99

export default function CartSidebar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isOpen, items, discountAmount, discountCode } = useAppSelector(s => s.cart)

  const subtotal = items.reduce((sum, item) => {
    const extrasTotal = item.selectedExtras.reduce((s, e) => s + e.price, 0)
    return sum + (item.foodItem.price + extrasTotal) * item.quantity
  }, 0)

  const total = Math.max(0, subtotal - discountAmount + (items.length > 0 ? DELIVERY_FEE : 0))

  const handleCheckout = () => {
    dispatch(closeCart())
    navigate('/checkout')
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && dispatch(closeCart())}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] bg-zinc-900 border-l border-white/10 flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-auto text-xs bg-amber-500 text-black font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-zinc-600" />
              </div>
              <div>
                <p className="text-white font-medium">Your cart is empty</p>
                <p className="text-sm text-zinc-500 mt-1">Add items from the menu to get started</p>
              </div>
              <Button
                onClick={() => { dispatch(closeCart()); navigate('/menu') }}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => {
                  const extrasTotal = item.selectedExtras.reduce((s, e) => s + e.price, 0)
                  const itemTotal = (item.foodItem.price + extrasTotal) * item.quantity

                  return (
                    <motion.div
                      key={`${item.foodItem.id}-${item.selectedExtras.map(e => e.id).join('-')}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <img
                        src={item.foodItem.image}
                        alt={item.foodItem.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.foodItem.name}</p>
                        {item.selectedExtras.length > 0 && (
                          <p className="text-xs text-zinc-500 mt-0.5 truncate">
                            + {item.selectedExtras.map(e => e.name).join(', ')}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => dispatch(updateQuantity({ index: idx, qty: item.quantity - 1 }))}
                              className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-white">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(updateQuantity({ index: idx, qty: item.quantity + 1 }))}
                              className="w-6 h-6 rounded-md bg-white/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-400 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-amber-400">{formatPrice(itemTotal)}</span>
                            <button
                              onClick={() => dispatch(removeItem({
                                foodItemId: item.foodItem.id,
                                extraIds: item.selectedExtras.map(e => e.id),
                              }))}
                              className="p-1 rounded hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-white/10 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountCode && (
                <div className="flex justify-between text-amber-400">
                  <span>Discount ({discountCode})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Delivery</span>
                <span>{formatPrice(DELIVERY_FEE)}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between font-semibold text-white text-base">
                <span>Total</span>
                <span className="text-amber-400">{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-12 text-sm"
            >
              Checkout <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
