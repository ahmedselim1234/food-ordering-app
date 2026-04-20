import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroBanner from '@/components/offers/HeroBanner'
import OfferCard from '@/components/offers/OfferCard'
import CategoryTabs from '@/components/menu/CategoryTabs'
import FoodCard from '@/components/menu/FoodCard'
import FoodModal from '@/components/menu/FoodModal'
import { Button } from '@/components/ui/button'
import { offers } from '@/data/offersData'
import { categories } from '@/data/categoriesData'
import { popularItems } from '@/data/menuData'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addItem } from '@/store/slices/cartSlice'
import type { FoodItem, CartItem } from '@/types'

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [modalItem, setModalItem] = useState<FoodItem | null>(null)

  const handleQuickAdd = (item: FoodItem) => {
    dispatch(addItem({ foodItem: item, quantity: 1, selectedExtras: [] }))
  }

  const handleAddToCart = (cartItem: CartItem) => {
    dispatch(addItem(cartItem))
  }

  return (
    <div className="flex flex-col">
      <HeroBanner />

      {/* Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-2">Limited Time</p>
            <h2 className="font-display text-3xl font-bold text-white">Special Offers</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <OfferCard offer={offer} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full">
        <h2 className="font-display text-3xl font-bold text-white mb-6">Browse Categories</h2>
        <CategoryTabs
          categories={categories}
          active="all"
          onChange={(slug) => navigate(`/menu?category=${slug}`)}
        />
      </section>

      {/* Popular Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-2">Fan Favorites</p>
            <h2 className="font-display text-3xl font-bold text-white">Popular Dishes</h2>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/menu')}
            className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
          >
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <FoodCard item={item} onOpen={setModalItem} onQuickAdd={handleQuickAdd} />
            </motion.div>
          ))}
        </div>
      </section>

      <FoodModal
        item={modalItem}
        open={!!modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
