import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import CategoryTabs from '@/components/menu/CategoryTabs'
import MenuGrid from '@/components/menu/MenuGrid'
import FoodModal from '@/components/menu/FoodModal'
import { Input } from '@/components/ui/input'
import { useGetFoodItemsQuery } from '@/store/api/menuApi'
import { useGetCategoriesQuery } from '@/store/api/menuApi'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addItem } from '@/store/slices/cartSlice'
import type { FoodItem, CartItem } from '@/types'

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? 'all')
  const [modalItem, setModalItem] = useState<FoodItem | null>(null)
  const dispatch = useAppDispatch()

  const { data: categories = [] } = useGetCategoriesQuery()
  const { data: items = [], isLoading } = useGetFoodItemsQuery({
    category: activeCategory === 'all' ? undefined : activeCategory,
    search: search || undefined,
  })

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug)
    setSearchParams(slug !== 'all' ? { category: slug } : {})
  }

  const handleQuickAdd = (item: FoodItem) => {
    dispatch(addItem({ foodItem: item, quantity: 1, selectedExtras: [] }))
  }

  const handleAddToCart = (cartItem: CartItem) => {
    dispatch(addItem(cartItem))
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900/80 to-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-2">Our Menu</p>
            <h1 className="font-display text-4xl font-bold text-white mb-6">Explore All Dishes</h1>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-amber-500/50 h-11"
            />
          </div>

          {/* Categories */}
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-500">
            {isLoading ? 'Loading...' : `${items.length} dish${items.length !== 1 ? 'es' : ''}`}
          </p>
          <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <MenuGrid
          items={items}
          isLoading={isLoading}
          onOpen={setModalItem}
          onQuickAdd={handleQuickAdd}
        />
      </div>

      <FoodModal
        item={modalItem}
        open={!!modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
