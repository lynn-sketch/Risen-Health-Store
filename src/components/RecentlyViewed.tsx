import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatUGX, getProduct, type Product } from '../data/products'

const KEY = 'rhs-recent'

export function trackView(id: string) {
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(KEY) || '[]')
    const next = [id, ...prev.filter((x) => x !== id)].slice(0, 6)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(KEY) || '[]')
      setItems(
        ids
          .filter((id) => id !== excludeId)
          .map((id) => getProduct(id))
          .filter(Boolean) as Product[],
      )
    } catch {
      setItems([])
    }
  }, [excludeId])

  if (items.length === 0) return null

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>Recently viewed</h2>
      <div className="product-grid" style={{ marginTop: '1rem' }}>
        {items.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="product-card" style={{ textDecoration: 'none' }}>
            <div className="product-media">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="product-body">
              <span className="product-brand">{p.brand}</span>
              <h3>{p.name}</h3>
              <span className="price">{formatUGX(p.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
