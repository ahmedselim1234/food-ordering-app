import { motion } from 'framer-motion'
import type { Category } from '@/types'

interface Props {
  categories: Category[]
  active: string
  onChange: (slug: string) => void
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar" style={{ scrollbarWidth: 'none' }}>
      {categories.map(cat => {
        const isActive = cat.slug === active
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.slug)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
              isActive
                ? 'text-black'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 bg-amber-500 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.icon}</span>
            <span className="relative z-10">{cat.name}</span>
          </button>
        )
      })}
    </div>
  )
}
