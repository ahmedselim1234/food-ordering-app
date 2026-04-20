import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Plus, Clock, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { FoodItem } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  item: FoodItem
  onOpen: (item: FoodItem) => void
  onQuickAdd: (item: FoodItem) => void
}

const TAG_CONFIG: Record<string, { label: string; class: string }> = {
  bestseller: { label: 'Bestseller', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  new: { label: 'New', class: 'bg-green-500/20 text-green-400 border-green-500/30' },
  spicy: { label: 'Spicy', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
  premium: { label: 'Premium', class: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  vegan: { label: 'Vegan', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  vegetarian: { label: 'Veg', class: 'bg-lime-500/20 text-lime-400 border-lime-500/30' },
  healthy: { label: 'Healthy', class: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
}

export default function FoodCard({ item, onOpen, onQuickAdd }: Props) {
  const [imgError, setImgError] = useState(false)

  const primaryTag = item.tags?.find(t => TAG_CONFIG[t])

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-dark hover:shadow-dark-lg hover:border-amber-500/20 transition-all duration-300"
      onClick={() => onOpen(item)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' : item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {primaryTag && TAG_CONFIG[primaryTag] && (
            <Badge className={`text-xs border font-medium ${TAG_CONFIG[primaryTag].class}`}>
              {primaryTag === 'spicy' && <Flame className="w-3 h-3 mr-1" />}
              {TAG_CONFIG[primaryTag].label}
            </Badge>
          )}
        </div>

        {/* Quick Add */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onQuickAdd(item) }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-black shadow-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Plus className="w-5 h-5 font-bold" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-tight mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-400">{formatPrice(item.price)}</span>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            {item.prepTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.prepTime}m
              </span>
            )}
            <span className="flex items-center gap-1 text-amber-400/80">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {item.rating}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
