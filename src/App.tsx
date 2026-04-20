import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/layout/CartSidebar'
import { Toaster } from '@/components/ui/toaster'
import ProtectedRoute from '@/guards/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import MenuPage from '@/pages/MenuPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderTrackingPage from '@/pages/OrderTrackingPage'
import ProfilePage from '@/pages/ProfilePage'
import OrderHistoryPage from '@/pages/OrderHistoryPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { rehydrateUser } from '@/store/slices/authSlice'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(rehydrateUser())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/tracking/:orderId" element={<OrderTrackingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <CartSidebar />
      <Toaster />
    </div>
  )
}
