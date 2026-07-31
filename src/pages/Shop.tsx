import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ShopSidebar } from '../components/ShopSidebar'
import { CATEGORIES, products, type Category } from '../data/products'
import { PanelLeft, Truck } from 'lucide-react'

export function Shop() {
  const [params, setParams] = useSearchParams()
  const initialCat = (params.get('cat') as Category | 'all') || 'all'
  const initialQ = params.get('q') || ''
  const [category, setCategory] = useState<Category | 'all'>(
    CATEGORIES.some((c) => c.id === initialCat) ? initialCat : 'all',
  )
  const [query, setQuery] = useState(initialQ)
  const [sort, setSort] = useState('default')
  const [brand, setBrand] = useState('all')
  const [maxPrice, setMaxPrice] = useState(Math.max(...products.map((p) => p.price)))
  const [onlyBest, setOnlyBest] = useState(false)
  const [inStock, setInStock] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const q = params.get('q') || ''
    const cat = (params.get('cat') as Category | 'all') || 'all'
    setQuery(q)
    if (CATEGORIES.some((c) => c.id === cat)) setCategory(cat)
  }, [params])

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (brand !== 'all') list = list.filter((p) => p.brand === brand)
    if (onlyBest) list = list.filter((p) => p.bestSeller)
    if (inStock) list = list.filter((p) => p.stock > 0)
    list = list.filter((p) => p.price <= maxPrice)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.benefits.some((b) => b.toLowerCase().includes(q)),
      )
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'stock') list.sort((a, b) => a.stock - b.stock)
    return list
  }, [category, query, sort, brand, maxPrice, onlyBest, inStock])

  const updateCat = (id: Category | 'all') => {
    setCategory(id)
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('cat')
    else next.set('cat', id)
    setParams(next, { replace: true })
    setSidebarOpen(false)
  }

  return (
    <section className="section catalog-section">
      <div className="container">
        <div className="page-hero">
          <h1>Shop All Products</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '52ch' }}>
            Clear product photos · USD pricing · WhatsApp checkout · curated by Sylivia Wanga
          </p>
        </div>

        <div className="catalog-layout">
          <div className={`sidebar-shell ${sidebarOpen ? 'open' : ''}`}>
            <ShopSidebar
              category={category}
              onCategory={updateCat}
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
                placeholder="Search products, benefits, brands…"
              />
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
                <option value="stock">Low stock first</option>
              </select>
            </div>

            <div className="catalog-meta">
              <span>
                Showing <strong>{filtered.length}</strong> of {products.length} products
              </span>
              <span className="meta-pill">
                <Truck size={14} /> Fast Kampala delivery
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>No products match your filters. Reset category or raise the price limit.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
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
