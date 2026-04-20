import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CreditCard, ClipboardCheck, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import OrderSummaryComponent from '@/components/checkout/OrderSummary'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { clearCart } from '@/store/slices/cartSlice'
import { setCurrentOrder } from '@/store/slices/orderSlice'
import { usePlaceOrderMutation } from '@/store/api/ordersApi'
import { useToast } from '@/hooks/use-toast'
import type { Address } from '@/types'

const DELIVERY_FEE = 3.99

const steps = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: ClipboardCheck },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
  const [placeOrder, { isLoading }] = usePlaceOrderMutation()

  const { items, discountAmount } = useAppSelector(s => s.cart)
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.foodItem.price + item.selectedExtras.reduce((s, e) => s + e.price, 0)) * item.quantity
  }, 0)
  const total = Math.max(0, subtotal - discountAmount + DELIVERY_FEE)

  const canProceed = step === 1 ? !!selectedAddress : true

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1)
  }

  const handlePlace = async () => {
    if (!selectedAddress) return
    try {
      const order = await placeOrder({ items, address: selectedAddress, paymentMethod, total }).unwrap()
      dispatch(setCurrentOrder(order))
      dispatch(clearCart())
      toast({ title: 'Order placed!', description: 'Your food is being prepared.' })
      navigate(`/tracking/${order.id}`)
    } catch {
      toast({ title: 'Error', description: 'Failed to place order. Please try again.', variant: 'destructive' })
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-white mb-8">Checkout</h1>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon
            const isActive = step === s.id
            const isDone = step > s.id
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isDone ? 'bg-amber-500 text-black' : isActive ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-white/5 text-zinc-600 border border-white/10'
                  }`}>
                    {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${isActive ? 'text-white' : isDone ? 'text-amber-400' : 'text-zinc-600'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 ${step > s.id ? 'bg-amber-500/50' : 'bg-white/10'}`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Step content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-900 border border-white/5 rounded-2xl p-6"
              >
                <h2 className="font-semibold text-white text-lg mb-5">
                  {step === 1 ? 'Delivery Address' : step === 2 ? 'Payment Method' : 'Order Review'}
                </h2>

                {step === 1 && (
                  <AddressForm selected={selectedAddress} onSelect={setSelectedAddress} />
                )}
                {step === 2 && (
                  <PaymentForm method={paymentMethod} onChange={setPaymentMethod} />
                )}
                {step === 3 && selectedAddress && (
                  <OrderSummaryComponent
                    items={items}
                    address={selectedAddress}
                    paymentMethod={paymentMethod}
                    subtotal={subtotal}
                    discountAmount={discountAmount}
                    total={total}
                    onPlace={handlePlace}
                    isLoading={isLoading}
                  />
                )}

                {step < 3 && (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="w-full mt-6 h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold"
                  >
                    Continue
                  </Button>
                )}
                {step > 1 && step < 3 && (
                  <button onClick={() => setStep(s => s - 1)} className="w-full mt-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                    ← Back
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mini summary */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 sticky top-24">
              <h3 className="font-medium text-white mb-4">Order ({items.length} {items.length === 1 ? 'item' : 'items'})</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-zinc-400 truncate flex-1 pr-2">{item.quantity}× {item.foodItem.name}</span>
                    <span className="text-white flex-shrink-0">${((item.foodItem.price + item.selectedExtras.reduce((s, e) => s + e.price, 0)) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                <span className="text-zinc-400 text-sm">Total</span>
                <span className="text-amber-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
