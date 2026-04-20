import { motion } from 'framer-motion'
import { ChefHat } from 'lucide-react'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold">
            <ChefHat className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-500 text-sm">Sign in to your Aurum account</p>
        </div>
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
          <LoginForm />
        </div>
        <p className="text-center text-xs text-zinc-600 mt-6">
          Demo: use any email + password (6+ chars)
        </p>
      </motion.div>
    </div>
  )
}
