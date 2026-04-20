import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tag, Copy, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Offer } from '@/types'

interface Props {
  offer: Offer
}

export default function OfferCard({ offer }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.discountCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 group"
    >
      <div className="relative h-40">
        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-amber-500 text-black font-bold border-0 text-sm">
          -{offer.discountPercent}%
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-1">{offer.title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2">{offer.description}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Tag className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="text-amber-400 font-mono font-bold text-sm tracking-wider">{offer.discountCode}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-zinc-500 hover:text-amber-400 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-zinc-600 mt-2">Min order: ${offer.minOrder} · Valid until {new Date(offer.validUntil).toLocaleDateString()}</p>
      </div>
    </motion.div>
  )
}
