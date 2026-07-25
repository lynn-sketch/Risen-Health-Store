import { Heart, GitCompareArrows, ShoppingBag, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatUGX } from '../data/products'
import { useStore } from '../context/StoreContext'
import { useRequireAuthAction } from '../hooks/useRequireAuthAction'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, compareIds } =
    useStore()
  const requireAuth = useRequireAuthAction()
  const wished = isWishlisted(product.id)
  const comparing = compareIds.includes(product.id)

  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <div className="product-actions">
          <button
            type="button"
            className={`pill-btn ${wished ? 'active' : ''}`}
            aria-label="Wishlist"
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            className={`pill-btn ${comparing ? 'active' : ''}`}
            aria-label="Compare"
            onClick={() => toggleCompare(product.id)}
          >
            <GitCompareArrows size={16} />
          </button>
        </div>
        <div className="product-badges">
          {product.bestSeller && <span className="badge">Best Seller</span>}
          {product.stock <= 5 && (
            <span className="badge badge-stock">Only {product.stock} left</span>
          )}
        </div>
      </div>
      <div className="product-body">
        <span className="product-brand">{product.brand}</span>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-tagline">{product.description}</p>
        <div className="delivery-line">
          <Truck size={13} /> Fast Kampala delivery
        </div>
        <div className="product-meta">
          <span className="price">{formatUGX(product.price)}</span>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.55rem 0.8rem' }}
            onClick={() =>
              requireAuth(() => addToCart(product), `/product/${product.id}`)
            }
          >
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
