import { Link } from 'react-router-dom'
import { ChefHat, Share2, MessageCircle, Play } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-black" />
              </div>
              <span className="font-display font-bold text-xl text-gold-gradient">Aurum</span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Premium food delivery with a luxury touch. Curated dishes from the world's finest kitchens, delivered to your door.
            </p>
            <div className="flex gap-4 mt-6">
              {[Share2, MessageCircle, Play].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 flex items-center justify-center text-zinc-500 hover:text-amber-400 transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home', '/'], ['Menu', '/menu'], ['My Orders', '/orders'], ['Profile', '/profile']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Info</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>Mon–Sun: 10am – 2am</li>
              <li>+1 (555) 012-3456</li>
              <li>hello@aurum.food</li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1 text-amber-500/80 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Currently Accepting Orders
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© 2026 Aurum. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-zinc-600">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
