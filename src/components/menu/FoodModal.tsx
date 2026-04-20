import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { FoodItem, Extra, CartItem } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  item: FoodItem | null
  open: boolean
  onClose: () => void
  onAddToCart: (cartItem: CartItem) => void
}

export default function FoodModal({ item, open, onClose, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])
  const [notes, setNotes] = useState('')

  if (!item) return null

  const extrasTotal = selectedExtras.reduce((s, e) => s + e.price, 0)
  const lineTotal = (item.price + extrasTotal) * quantity

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    )
  }

  const handleAdd = () => {
    onAddToCart({ foodItem: item, quantity, selectedExtras, notes: notes || undefined })
    setQuantity(1)
    setSelectedExtras([])
    setNotes('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-zinc-900 border-white/10 p-0 overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto [&>button]:hidden">
        {/* Image */}
        <div className="relative h-56 sm:h-64">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 left-0 p-5">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.tags?.slice(0, 2).map(tag => (
                <Badge key={tag} className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs capitalize">{tag}</Badge>
              ))}
            </div>
            <h2 className="text-xl font-bold text-white">{item.name}</h2>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-white font-medium">{item.rating}</span>
              <span>({item.reviews} reviews)</span>
            </span>
            {item.prepTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {item.prepTime} min
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>

          <Separator className="bg-white/10" />

          {/* Extras */}
          {item.extras && item.extras.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Add Extras</h4>
              <div className="space-y-2">
                {item.extras.map(extra => {
                  const selected = !!selectedExtras.find(e => e.id === extra.id)
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all ${
                        selected
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-zinc-600'}`}>
                          {selected && <span className="text-black text-xs font-bold">✓</span>}
                        </span>
                        {extra.name}
                      </span>
                      <span>+{formatPrice(extra.price)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-zinc-400 block mb-2">Special Instructions</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. no onions, extra sauce..."
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          <Separator className="bg-white/10" />

          {/* Quantity + Add */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-white text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-9 h-9 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleAdd}
                className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart · {formatPrice(lineTotal)}
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
