import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSignupMutation } from '@/store/api/authApi'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setCredentials } from '@/store/slices/authSlice'
import { useToast } from '@/hooks/use-toast'

export default function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [signup, { isLoading }] = useSignupMutation()
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const errs: Record<string, string> = {}
    if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters'
    if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number'
    if (!form.email.includes('@')) errs.email = 'Enter a valid email'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const result = await signup({ name: form.name, phone: form.phone, email: form.email, password: form.password }).unwrap()
      dispatch(setCredentials(result))
      toast({ title: 'Account created!', description: `Welcome, ${result.user.name}!` })
      navigate('/')
    } catch {
      toast({ title: 'Signup failed', description: 'Something went wrong. Please try again.', variant: 'destructive' })
    }
  }

  const fields = [
    { key: 'name' as const, label: 'Full Name', type: 'text', placeholder: 'Alex Johnson' },
    { key: 'phone' as const, label: 'Phone', type: 'tel', placeholder: '+1 555 0123' },
    { key: 'email' as const, label: 'Email', type: 'email', placeholder: 'you@example.com' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <Label htmlFor={key} className="text-zinc-300 text-sm mb-1.5 block">{label}</Label>
          <Input
            id={key}
            type={type}
            placeholder={placeholder}
            value={form[key]}
            onChange={set(key)}
            className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-amber-500/50 h-11"
          />
          {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
        </div>
      ))}

      {[
        { key: 'password' as const, label: 'Password', placeholder: '••••••••' },
        { key: 'confirm' as const, label: 'Confirm Password', placeholder: '••••••••' },
      ].map(({ key, label, placeholder }) => (
        <div key={key}>
          <Label htmlFor={key} className="text-zinc-300 text-sm mb-1.5 block">{label}</Label>
          <div className="relative">
            <Input
              id={key}
              type={showPw ? 'text' : 'password'}
              placeholder={placeholder}
              value={form[key]}
              onChange={set(key)}
              className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-amber-500/50 h-11 pr-11"
            />
            {key === 'password' && (
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
          </div>
          {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold mt-2"
      >
        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</> : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-zinc-500">
        Already have an account?{' '}
        <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">Login</Link>
      </p>
    </form>
  )
}
