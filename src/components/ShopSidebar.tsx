import { Link } from 'react-router-dom'
import {
  CATEGORIES,
  formatUGX,
  getBestSellers,
  products,
  type Category,
} from '../data/products'
import { WHATSAPP_NUMBERS } from '../context/StoreContext'
import { MessageCircle, SlidersHorizontal } from 'lucide-react'

interface ShopSidebarProps {
  category: Category | 'all'
  onCategory: (id: Category | 'all') => void
  brand: string
  onBrand: (brand: string) => void
  maxPrice: number
  onMaxPrice: (n: number) => void
  onlyBest: boolean
  onOnlyBest: (v: boolean) => void
  inStock: boolean
  onInStock: (v: boolean) => void
}

const brands = Array.from(new Set(products.map((p) => p.brand))).sort()
const priceCeiling = Math.max(...products.map((p) => p.price))

export function ShopSidebar({
  category,
  onCategory,
  brand,
  onBrand,
  maxPrice,
  onMaxPrice,
  onlyBest,
  onOnlyBest,
  inStock,
  onInStock,
}: ShopSidebarProps) {
  const counts = CATEGORIES.map((c) => ({
    ...c,
    count:
      c.id === 'all'
        ? products.length
        : products.filter((p) => p.category === c.id).length,
  }))
  const topSellers = getBestSellers().slice(0, 4)

  return (
    <aside className="shop-sidebar">
      <div className="sidebar-block">
        <h4>
          <SlidersHorizontal size={16} /> Filters
        </h4>
        <label className="sidebar-check">
          <input
            type="checkbox"
            checked={onlyBest}
            onChange={(e) => onOnlyBest(e.target.checked)}
          />
          Best sellers only
        </label>
        <label className="sidebar-check">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onInStock(e.target.checked)}
          />
          In stock only
        </label>
      </div>

      <div className="sidebar-block">
        <h4>Categories</h4>
        <ul className="sidebar-cats">
          {counts.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={category === c.id ? 'active' : undefined}
                onClick={() => onCategory(c.id)}
              >
                <span>{c.label}</span>
                <em>{c.count}</em>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-block">
        <h4>Brand</h4>
        <select
          value={brand}
          onChange={(e) => onBrand(e.target.value)}
          aria-label="Filter by brand"
        >
          <option value="all">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="sidebar-block">
        <h4>Max price</h4>
        <input
          type="range"
          min={25000}
          max={priceCeiling}
          step={5000}
          value={maxPrice}
          onChange={(e) => onMaxPrice(Number(e.target.value))}
        />
        <div className="sidebar-price-label">Up to {formatUGX(maxPrice)}</div>
      </div>

      <div className="sidebar-block">
        <h4>Top sellers</h4>
        <ul className="sidebar-mini">
          {topSellers.map((p) => (
            <li key={p.id}>
              <Link to={`/product/${p.id}`}>
                <img src={p.image} alt="" />
                <div>
                  <strong>{p.name}</strong>
                  <span>{formatUGX(p.price)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-cta">
        <p>Need help choosing?</p>
        <a
          className="btn btn-whatsapp"
          href={`https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent('Hi Sylivia! Please help me choose the right product.')}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} /> WhatsApp Sylivia
        </a>
        <Link to="/assessment" className="btn btn-outline" style={{ width: '100%' }}>
          Free Health Quiz
        </Link>
      </div>
    </aside>
  )
}
