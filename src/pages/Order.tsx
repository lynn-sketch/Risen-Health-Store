import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, PanelLeft, ShoppingBag, Truck } from 'lucide-react'
import { ShopSidebar } from '../components/ShopSidebar'
import { CATEGORIES, formatUGX, products, type Category } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useStore, WHATSAPP_NUMBERS } from '../context/StoreContext'
import { useRequireAuthAction } from '../hooks/useRequireAuthAction'

export function Order() {
  const { addToCart } = useStore()
  const { isAuthenticated } = useAuth()
  const requireAuth = useRequireAuthAction()
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [brand, setBrand] = useState('all')
  const [maxPrice, setMaxPrice] = useState(Math.max(...products.map((p) => p.price)))
  const [onlyBest, setOnlyBest] = useState(false)
  const [inStock, setInStock] = useState(true)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const list = useMemo(() => {
    let items = [...products]
    if (category !== 'all') items = items.filter((p) => p.category === category)
    if (brand !== 'all') items = items.filter((p) => p.brand === brand)
    if (onlyBest) items = items.filter((p) => p.bestSeller)
    if (inStock) items = items.filter((p) => p.stock > 0)
    items = items.filter((p) => p.price <= maxPrice)
    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.benefits.some((b) => b.toLowerCase().includes(q)),
      )
    }
    return items
  }, [category, brand, maxPrice, onlyBest, inStock, query])

  const orderWhatsApp = (name: string, price: number) => {
    const msg = `Hello Risen Health Store! I want to order: ${name} — ${formatUGX(price)}. Please confirm availability.`
    return `https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(msg)}`
  }

  return (
    <section className="section catalog-section">
      <div className="container">
        <div className="page-hero">
          <h1>Order Catalogue</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '54ch' }}>
            Clear store photos for matching Norland products, with a short description and
            one-tap WhatsApp ordering.
          </p>
        </div>

        <div className="catalog-layout">
          <div className={`sidebar-shell ${sidebarOpen ? 'open' : ''}`}>
            <ShopSidebar
              category={category}
              onCategory={(id) => {
                setCategory(id)
                setSidebarOpen(false)
              }}
              brand={brand}
              onBrand={setBrand}
              maxPrice={maxPrice}
              onMaxPrice={setMaxPrice}
              onlyBest={onlyBest}
              onOnlyBest={setOnlyBest}
              inStock={inStock}
              onInStock={setInStock}
            />
          </div>

          <div className="catalog-main">
            <div className="catalog-toolbar">
              <button
                type="button"
                className="btn btn-outline sidebar-toggle"
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <PanelLeft size={16} /> Filters
              </button>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search catalogue…"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | 'all')}
                aria-label="Category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="catalog-meta">
              <span>
                <strong>{list.length}</strong> products ready to order
              </span>
              <span className="meta-pill">
                <Truck size={14} /> Same-day available in Kampala
              </span>
            </div>

            <div className="order-list">
              {list.map((p) => (
                <article className="order-row" key={p.id}>
                  <Link to={`/product/${p.id}`} className="order-row-media">
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </Link>
                  <div className="order-row-body">
                    <span className="product-brand">{p.brand}</span>
                    <Link to={`/product/${p.id}`}>
                      <h3>{p.name}</h3>
                    </Link>
                    <p className="order-brief">{p.description}</p>
                    <ul className="order-bullets">
                      {p.benefits.slice(0, 3).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="order-row-actions">
                      <strong className="price">{formatUGX(p.price)}</strong>
                      {p.bestSeller && <span className="badge">Best Seller</span>}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => requireAuth(() => addToCart(p), '/order')}
                      >
                        <ShoppingBag size={16} /> Add
                      </button>
                      {isAuthenticated ? (
                        <a
                          className="btn btn-whatsapp"
                          href={orderWhatsApp(p.name, p.price)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MessageCircle size={16} /> Order
                        </a>
                      ) : (
                        <Link
                          to="/signup?next=/order&reason=order"
                          className="btn btn-whatsapp"
                        >
                          <MessageCircle size={16} /> Sign in to order
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close filters"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </section>
  )
}
