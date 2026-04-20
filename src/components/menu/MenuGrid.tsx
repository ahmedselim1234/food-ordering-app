import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import FoodCard from './FoodCard'
import type { FoodItem } from '@/types'

interface Props {
  items: FoodItem[]
  isLoading: boolean
  onOpen: (item: FoodItem) => void
  onQuickAdd: (item: FoodItem) => void
}

export default function MenuGrid({ items, isLoading, onOpen, onQuickAdd }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5">
            <Skeleton className="h-48 w-full bg-white/5 shimmer" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-white/5" />
              <Skeleton className="h-3 w-full bg-white/5" />
              <Skeleton className="h-3 w-2/3 bg-white/5" />
              <div className="flex justify-between pt-1">
                <Skeleton className="h-6 w-16 bg-white/5" />
                <Skeleton className="h-4 w-12 bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <span className="text-5xl">🍽️</span>
        <p className="text-white font-medium">No dishes found</p>
        <p className="text-sm text-zinc-500">Try a different category or search term</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {items.map(item => (
        <motion.div
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <FoodCard item={item} onOpen={onOpen} onQuickAdd={onQuickAdd} />
        </motion.div>
      ))}
    </motion.div>
  )
}
