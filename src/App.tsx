import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartDrawer } from './components/CartDrawer'
import { CompareBar } from './components/CompareBar'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { RequireAdmin } from './components/RequireAdmin'
import { RequireAuth } from './components/RequireAuth'
import { WhatsAppButton } from './components/WhatsAppButton'
import { AuthProvider } from './context/AuthContext'
import { StoreProvider } from './context/StoreContext'
import { About } from './pages/About'
import { Account } from './pages/Account'
import { Admin } from './pages/Admin'
import { Assessment } from './pages/Assessment'
import { Checkout } from './pages/Checkout'
import { Compare } from './pages/Compare'
import { Delivery } from './pages/Delivery'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Order } from './pages/Order'
import { ProductDetail } from './pages/ProductDetail'
import { Shop } from './pages/Shop'
import { Signup } from './pages/Signup'
import { TrackOrder } from './pages/TrackOrder'
import { Wishlist } from './pages/Wishlist'

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/order" element={<Order />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <Admin />
                  </RequireAdmin>
                }
              />
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <CompareBar />
          <WhatsAppButton />
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  )
}
