import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  qty: number
}

interface StoreContextValue {
  cart: CartItem[]
  wishlist: string[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  cartCount: number
  cartTotal: number
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  compareIds: string[]
  toggleCompare: (id: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadJSON('rhs-cart', []))
  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadJSON('rhs-wishlist', []),
  )
  const [compareIds, setCompareIds] = useState<string[]>(() =>
    loadJSON('rhs-compare', []),
  )
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('rhs-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('rhs-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('rhs-compare', JSON.stringify(compareIds))
  }, [compareIds])

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { product, qty }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    )
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const isWishlisted = (id: string) => wishlist.includes(id)

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [cart],
  )

  const value: StoreContextValue = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartCount,
    cartTotal,
    cartOpen,
    setCartOpen,
    compareIds,
    toggleCompare,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export const WHATSAPP_NUMBERS = {
  primary: '256787770484',
  secondary: '256754770484',
  display: ['0787770484', '0754770484'],
}

export function buildWhatsAppOrder(cart: CartItem[], total: number): string {
  const lines = cart.map(
    (i) => `• ${i.product.name} × ${i.qty} — UGX ${(i.product.price * i.qty).toLocaleString()}`,
  )
  const message = [
    'Hello Risen Health Store!',
    `I would like to order from Sylivia Wanga's store:`,
    '',
    ...lines,
    '',
    `Total: UGX ${total.toLocaleString()}`,
    '',
    'Please confirm availability and delivery.',
  ].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(message)}`
}
