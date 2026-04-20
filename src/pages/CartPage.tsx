import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import CartItemComponent from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/useAppSelector'

export default function CartPage() {
  const items = useAppSelector(s => s.cart.items)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="sm" asChild className="text-zinc-400 hover:text-white hover:bg-white/5">
              <Link to="/menu"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Menu</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="w-7 h-7 text-amber-400" />
            <h1 className="font-display text-3xl font-bold text-white">Your Cart</h1>
            {items.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
        </motion.div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-zinc-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-2">Your cart is empty</p>
              <p className="text-zinc-500">Add some delicious dishes to get started</p>
            </div>
            <Button asChild className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <motion.div
                    key={`${item.foodItem.id}-${item.selectedExtras.map(e => e.id).join('-')}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CartItemComponent item={item} index={idx} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
