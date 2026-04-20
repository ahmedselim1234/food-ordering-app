import { CreditCard, Banknote } from 'lucide-react'

interface Props {
  method: 'cash' | 'card'
  onChange: (method: 'cash' | 'card') => void
}

export default function PaymentForm({ method, onChange }: Props) {
  const options = [
    { id: 'cash' as const, label: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: Banknote },
    { id: 'card' as const, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex', icon: CreditCard },
  ]

  return (
    <div className="space-y-3">
      {options.map(opt => {
        const Icon = opt.icon
        const selected = method === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
              selected ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              selected ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-zinc-500'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white text-sm">{opt.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{opt.sub}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected ? 'border-amber-500 bg-amber-500' : 'border-zinc-600'
            }`}>
              {selected && <span className="w-2 h-2 rounded-full bg-black" />}
            </div>
          </button>
        )
      })}

      {method === 'card' && (
        <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3 mt-2">
          <input placeholder="Card Number" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50 transition-colors" />
          <div className="flex gap-4">
            <input placeholder="MM / YY" className="flex-1 bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50 transition-colors" />
            <input placeholder="CVV" className="w-20 bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <input placeholder="Cardholder Name" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50 transition-colors" />
          <p className="text-xs text-zinc-600 pt-1">🔒 This is a demo — no real card info is processed.</p>
        </div>
      )}
    </div>
  )
}
