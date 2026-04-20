import { useState } from 'react'
import { Plus, MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Address } from '@/types'
import { useAppSelector } from '@/hooks/useAppSelector'

interface Props {
  selected: Address | null
  onSelect: (addr: Address) => void
}

export default function AddressForm({ selected, onSelect }: Props) {
  const user = useAppSelector(s => s.auth.user)
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses ?? [])
  const [adding, setAdding] = useState(false)
  const [newAddr, setNewAddr] = useState({ label: '', street: '', city: '' })

  const handleAdd = () => {
    if (!newAddr.label || !newAddr.street || !newAddr.city) return
    const addr: Address = { id: 'a-' + Date.now(), ...newAddr }
    setAddresses(prev => [...prev, addr])
    onSelect(addr)
    setAdding(false)
    setNewAddr({ label: '', street: '', city: '' })
  }

  return (
    <div className="space-y-3">
      {addresses.map(addr => (
        <button
          key={addr.id}
          onClick={() => onSelect(addr)}
          className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
            selected?.id === addr.id
              ? 'border-amber-500/50 bg-amber-500/5'
              : 'border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
            selected?.id === addr.id ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-zinc-500'
          }`}>
            {selected?.id === addr.id ? <Check className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
          </div>
          <div>
            <p className="font-medium text-white text-sm">{addr.label}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{addr.street}</p>
            <p className="text-xs text-zinc-500">{addr.city}</p>
          </div>
        </button>
      ))}

      {adding ? (
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
          {[
            { k: 'label' as const, label: 'Label', placeholder: 'Home, Work...' },
            { k: 'street' as const, label: 'Street Address', placeholder: '123 Main St, Apt 4B' },
            { k: 'city' as const, label: 'City & ZIP', placeholder: 'New York, NY 10001' },
          ].map(({ k, label, placeholder }) => (
            <div key={k}>
              <Label className="text-zinc-400 text-xs mb-1 block">{label}</Label>
              <Input
                placeholder={placeholder}
                value={newAddr[k]}
                onChange={e => setNewAddr(prev => ({ ...prev, [k]: e.target.value }))}
                className="bg-white/5 border-white/10 text-white placeholder-zinc-600 h-9 text-sm focus:border-amber-500/50"
              />
            </div>
          ))}
          <div className="flex gap-2">
            <Button onClick={handleAdd} size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">Save Address</Button>
            <Button onClick={() => setAdding(false)} size="sm" variant="ghost" className="text-zinc-400 hover:text-white">Cancel</Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-white/15 hover:border-amber-500/30 text-zinc-500 hover:text-amber-400 transition-all text-sm"
        >
          <Plus className="w-4 h-4" /> Add new address
        </button>
      )}
    </div>
  )
}
