import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ArrowRight, RotateCcw, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetOrdersQuery } from '@/store/api/ordersApi'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addItem, openCart } from '@/store/slices/cartSlice'
import type { Order } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

const STATUS_STYLES: Record<string, string> = {
  placed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  preparing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  on_the_way: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
}

const STATUS_LABELS: Record<string, string> = {
  placed: 'Placed', preparing: 'Preparing', on_the_way: 'On the Way', delivered: 'Delivered',
}

export default function OrderHistoryPage() {
  const dispatch = useAppDispatch()
  const { data: orders = [], isLoading } = useGetOrdersQuery()

  const handleReorder = (order: Order) => {
    order.items.forEach(item => dispatch(addItem(item)))
    dispatch(openCart())
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-2">History</p>
          <h1 className="font-display text-3xl font-bold text-white mb-8">My Orders</h1>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-5">
                <Skeleton className="h-5 w-32 bg-white/5 mb-3" />
                <Skeleton className="h-4 w-48 bg-white/5 mb-4" />
                <Skeleton className="h-9 w-24 bg-white/5" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center">
              <Package className="w-12 h-12 text-zinc-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-2">No orders yet</p>
              <p className="text-zinc-500">Your order history will appear here</p>
            </div>
            <Button asChild className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
              <Link to="/menu">Start Ordering</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-zinc-900 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-zinc-500">{order.id}</span>
                      <Badge className={`text-xs border ${STATUS_STYLES[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-amber-400">{formatPrice(order.total)}</span>
                </div>

                {order.items.length > 0 && (
                  <div className="text-sm text-zinc-500 mb-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <span key={idx}>{item.quantity}× {item.foodItem.name}{idx < Math.min(order.items.length, 3) - 1 ? ', ' : ''}</span>
                    ))}
                    {order.items.length > 3 && <span> +{order.items.length - 3} more</span>}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReorder(order)}
                    className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reorder
                  </Button>
                  {order.status !== 'delivered' && (
                    <Button size="sm" asChild className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 hover:border-amber-500/40 gap-1.5">
                      <Link to={`/tracking/${order.id}`}>
                        Track <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
