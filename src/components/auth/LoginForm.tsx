import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '@/store/api/authApi'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setCredentials } from '@/store/slices/authSlice'
import { useToast } from '@/hooks/use-toast'

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [login, { isLoading }] = useLoginMutation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.email.includes('@')) errs.email = 'Enter a valid email'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const result = await login(form).unwrap()
      dispatch(setCredentials(result))
      toast({ title: 'Welcome back!', description: `Logged in as ${result.user.name}` })
      navigate(from, { replace: true })
    } catch {
      toast({ title: 'Login failed', description: 'Invalid email or password', variant: 'destructive' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="email" className="text-zinc-300 text-sm mb-1.5 block">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-amber-500/50 h-11"
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="password" className="text-zinc-300 text-sm mb-1.5 block">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-amber-500/50 h-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPw(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold"
      >
        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...</> : 'Login'}
      </Button>

      <p className="text-center text-sm text-zinc-500">
        Don't have an account?{' '}
        <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-medium">Sign up</Link>
      </p>
    </form>
  )
}
