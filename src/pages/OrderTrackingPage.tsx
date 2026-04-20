import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ChefHat, Bike, Package, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTrackOrderQuery } from '@/store/api/ordersApi'
import { useAppSelector } from '@/hooks/useAppSelector'

const STEPS = [
  { id: 'placed', label: 'Order Placed', sub: 'We received your order', icon: Package },
  { id: 'preparing', label: 'Preparing', sub: 'Chefs are cooking', icon: ChefHat },
  { id: 'on_the_way', label: 'On the Way', sub: 'Rider is heading to you', icon: Bike },
  { id: 'delivered', label: 'Delivered', sub: 'Enjoy your meal!', icon: CheckCircle2 },
]

const STATUS_IDX: Record<string, number> = {
  placed: 0, preparing: 1, on_the_way: 2, delivered: 3,
}

export default function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const currentOrder = useAppSelector(s => s.orders.currentOrder)
  const { data: order, isLoading } = useTrackOrderQuery(orderId ?? '', { skip: !orderId })

  const trackingOrder = order ?? currentOrder
  const currentStepIdx = trackingOrder ? STATUS_IDX[trackingOrder.status] : 0

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Package className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-zinc-400">Loading order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" size="sm" asChild className="mb-6 text-zinc-400 hover:text-white hover:bg-white/5">
            <Link to="/orders"><ArrowLeft className="w-4 h-4 mr-1" /> My Orders</Link>
          </Button>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4"
              >
                <ChefHat className="w-10 h-10 text-amber-400" />
              </motion.div>
              <h1 className="font-display text-2xl font-bold text-white mb-1">Tracking Order</h1>
              <p className="text-zinc-500 text-sm font-mono">{orderId}</p>
              {trackingOrder?.estimatedTime && (
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-sm font-medium">~{trackingOrder.estimatedTime} min estimated</span>
                </div>
              )}
            </div>

            {/* Progress steps */}
            <div className="space-y-0">
              {STEPS.map((step, idx) => {
                const isDone = idx < currentStepIdx
                const isActive = idx === currentStepIdx
                const Icon = step.icon

                return (
                  <div key={step.id} className="flex gap-4">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={isActive ? { scale: 0.5 } : {}}
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isDone ? 'bg-amber-500 text-black' :
                          isActive ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-500/50' :
                          'bg-white/5 text-zinc-600 border border-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      {idx < STEPS.length - 1 && (
                        <div className="flex-1 w-px my-2 min-h-6">
                          <div className={`h-full w-px mx-auto ${isDone ? 'bg-amber-500/50' : 'bg-white/10'}`} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6 flex-1">
                      <p className={`font-semibold text-sm ${isDone || isActive ? 'text-white' : 'text-zinc-600'}`}>
                        {step.label}
                        {isDone && <span className="ml-2 text-amber-400 text-xs">✓</span>}
                        {isActive && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDone || isActive ? 'text-zinc-400' : 'text-zinc-700'}`}>{step.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            {trackingOrder?.status === 'delivered' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center"
              >
                <p className="text-green-400 font-semibold">Your order has been delivered!</p>
                <p className="text-zinc-500 text-sm mt-1">Enjoy your meal 🍽️</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
