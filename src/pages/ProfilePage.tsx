import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin, Edit2, Save, X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { Address } from '@/types'

export default function ProfilePage() {
  const user = useAppSelector(s => s.auth.user)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? '', phone: user?.phone ?? '', email: user?.email ?? '' })
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses ?? [])
  const [addingAddr, setAddingAddr] = useState(false)
  const [newAddr, setNewAddr] = useState({ label: '', street: '', city: '' })

  const handleSave = () => setEditing(false)

  const handleAddAddress = () => {
    if (!newAddr.label || !newAddr.street || !newAddr.city) return
    setAddresses(prev => [...prev, { id: 'a-' + Date.now(), ...newAddr }])
    setNewAddr({ label: '', street: '', city: '' })
    setAddingAddr(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <p className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-2">Account</p>
            <h1 className="font-display text-3xl font-bold text-white">My Profile</h1>
          </div>

          {/* Profile card */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-amber-500/30">
                  <AvatarFallback className="bg-amber-500/10 text-amber-400 text-lg font-bold">
                    {user?.name?.slice(0, 2).toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-white text-lg">{user?.name}</h2>
                  <p className="text-sm text-zinc-500">Premium Member</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="text-zinc-400 hover:text-white hover:bg-white/5 gap-1.5"
              >
                {editing ? <><Save className="w-4 h-4" /> Save</> : <><Edit2 className="w-4 h-4" /> Edit</>}
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'name' as const, label: 'Full Name', icon: User },
                { key: 'phone' as const, label: 'Phone', icon: Phone },
                { key: 'email' as const, label: 'Email', icon: Mail },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key}>
                  <Label className="text-zinc-500 text-xs mb-1.5 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </Label>
                  {editing ? (
                    <Input
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white h-10 focus:border-amber-500/50"
                    />
                  ) : (
                    <p className="text-white text-sm px-0.5">{form[key] || '—'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" /> Saved Addresses
            </h3>
            <div className="space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{addr.label}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{addr.street}</p>
                    <p className="text-xs text-zinc-500">{addr.city}</p>
                  </div>
                  <button
                    onClick={() => setAddresses(prev => prev.filter(a => a.id !== addr.id))}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {addingAddr ? (
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-3">
                  {[
                    { k: 'label' as const, placeholder: 'Label (Home, Work...)' },
                    { k: 'street' as const, placeholder: 'Street Address' },
                    { k: 'city' as const, placeholder: 'City & ZIP' },
                  ].map(({ k, placeholder }) => (
                    <Input
                      key={k}
                      placeholder={placeholder}
                      value={newAddr[k]}
                      onChange={e => setNewAddr(p => ({ ...p, [k]: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white placeholder-zinc-600 h-9 text-sm focus:border-amber-500/50"
                    />
                  ))}
                  <div className="flex gap-2">
                    <Button onClick={handleAddAddress} size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">Add</Button>
                    <Button onClick={() => setAddingAddr(false)} size="sm" variant="ghost" className="text-zinc-400">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingAddr(true)}
                  className="w-full flex items-center gap-2 p-3 rounded-xl border border-dashed border-white/15 hover:border-amber-500/30 text-zinc-500 hover:text-amber-400 transition-all text-sm"
                >
                  <Plus className="w-4 h-4" /> Add new address
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
