import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, User, ChefHat, LogOut, ClipboardList, UserCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { toggleCart } from '@/store/slices/cartSlice'
import { logout } from '@/store/slices/authSlice'
import { clearCart } from '@/store/slices/cartSlice'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAppSelector(s => s.auth)
  const cartCount = useAppSelector(s => s.cart.items.reduce((sum, i) => sum + i.quantity, 0))

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold">
              <ChefHat className="w-5 h-5 text-black" />
            </div>
            <span className="font-display font-bold text-xl text-gold-gradient">Aurum</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-400 hover:text-amber-400"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-amber-500 text-black border-0 font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </Badge>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 transition-colors">
                    <Avatar className="w-8 h-8 border border-amber-500/30">
                      <AvatarFallback className="bg-amber-500/10 text-amber-400 text-xs font-bold">
                        {user?.name?.slice(0, 2).toUpperCase() ?? 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-white/10">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer">
                      <UserCircle className="w-4 h-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer">
                      <ClipboardList className="w-4 h-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 cursor-pointer">
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="text-zinc-400 hover:text-white hover:bg-white/5">
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-black/95"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-zinc-400 hover:text-amber-400 py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="flex-1 border-white/10 text-zinc-300">
                    <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white py-2">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white py-2">
                    <ClipboardList className="w-4 h-4" /> My Orders
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="flex items-center gap-2 text-sm text-red-400 py-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
