import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import {
  Heart,
  LogIn,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useStore, WHATSAPP_NUMBERS } from '../context/StoreContext'

const listedLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop All Products' },
  { to: '/order', label: 'Order' },
  { to: '/assessment', label: 'Health Quiz' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/track', label: 'Track Order' },
  { to: '/delivery', label: 'Delivery Info' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/checkout', label: 'Checkout' },
]

export function Header() {
  const { cartCount, wishlist, setCartOpen } = useStore()
  const { isAuthenticated, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const sidebar = (
    <>
      <div
        className={`site-sidebar-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
      <aside
        className={`site-sidebar ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Site menu"
      >
        <div className="site-sidebar-top">
          <Link to="/" className="site-sidebar-brand" onClick={closeMenu}>
            <div className="brand-mark">R</div>
            <div>
              <strong>Risen Health Store</strong>
              <em>Wellness that rises with you</em>
            </div>
          </Link>
          <button
            type="button"
            className="site-sidebar-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="site-sidebar-nav">
          {listedLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <NavLink to="/account" onClick={closeMenu}>
              My Account
            </NavLink>
          ) : (
            <NavLink to="/login?reason=order" onClick={closeMenu}>
              Sign in
            </NavLink>
          )}
        </nav>

      </aside>
    </>
  )

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container">
          <span>
            Fast delivery on orders in Kampala ·{' '}
            <Link to="/track" style={{ color: 'var(--gold-light)' }}>
              Track Order →
            </Link>
          </span>
          <span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Order
            </a>
            {' · '}
            <a href={`tel:+${WHATSAPP_NUMBERS.primary}`}>
              <Phone size={12} style={{ verticalAlign: -1 }} /> {WHATSAPP_NUMBERS.display[0]}
            </a>
            {' / '}
            <a href={`tel:+${WHATSAPP_NUMBERS.secondary}`}>
              {WHATSAPP_NUMBERS.display[1]}
            </a>
            {' · '}
            <strong style={{ color: 'var(--gold-light)' }}>UGX</strong>
          </span>
        </div>
      </div>

      <div className="container header-main">
        <div className="header-left">
          <button
            type="button"
            className="icon-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="brand" aria-label="Risen Health Store home">
            <div className="brand-mark">R</div>
            <div className="brand-text">
              <strong>Risen Health Store</strong>
              <span>by Sylivia Wanga</span>
            </div>
          </Link>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={20} />
          </button>
          {isAuthenticated ? (
            <Link
              to="/account"
              className="btn btn-outline auth-header-btn"
              title={user?.name}
            >
              <UserRound size={16} /> Account
            </Link>
          ) : (
            <Link to="/signup?next=/checkout" className="btn btn-primary auth-header-btn">
              <LogIn size={16} /> Sign up
            </Link>
          )}
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </Link>
          <button
            type="button"
            className="icon-btn"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="count">{cartCount}</span>}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="container" style={{ paddingBottom: '0.85rem' }}>
          <form
            className="toolbar"
            style={{ margin: 0 }}
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = `/shop?q=${encodeURIComponent(query)}`
            }}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search regenerative medicines, tea, devices…"
              aria-label="Search products"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      )}

      {createPortal(sidebar, document.body)}
    </header>
  )
}
