import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { logout } from '@/store/slices/authSlice'
import { clearCart } from '@/store/slices/cartSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated, token } = useAppSelector(s => s.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    navigate('/login')
  }

  return { user, isAuthenticated, token, handleLogout }
}
