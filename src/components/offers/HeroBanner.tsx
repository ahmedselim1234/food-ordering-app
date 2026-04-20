import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroBanner() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            Premium Food Delivery
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-6"
          >
            <span className="text-white">Taste the</span>
            <br />
            <span className="text-gold-gradient">Extraordinary</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
          >
            Curated dishes from the world's finest kitchens, crafted by Michelin-starred chefs and delivered to your door.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/menu')}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-13 px-8 text-base shadow-gold hover:shadow-gold-lg transition-shadow"
            >
              Order Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/menu')}
              className="border-white/20 text-white hover:bg-white/5 h-13 px-8 text-base"
            >
              Explore Menu
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 mt-14 pt-8 border-t border-white/10"
          >
            {[
              { value: '4.9★', label: 'Average Rating' },
              { value: '30min', label: 'Avg Delivery' },
              { value: '50+', label: 'Premium Dishes' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
