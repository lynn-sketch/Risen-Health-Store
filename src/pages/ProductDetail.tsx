import { useEffect } from 'react'
import { Check, Heart, ShoppingBag, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { RecentlyViewed, trackView } from '../components/RecentlyViewed'
import { formatUGX, getProduct, products } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useStore, WHATSAPP_NUMBERS } from '../context/StoreContext'
import { useRequireAuthAction } from '../hooks/useRequireAuthAction'

export function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id || '')
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const { isAuthenticated } = useAuth()
  const requireAuth = useRequireAuthAction()

  useEffect(() => {
    if (product) trackView(product.id)
  }, [product])

  if (!product) {
    return (
      <div className="container empty-state section">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const wished = isWishlisted(product.id)
  const wa = `https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} (${formatUGX(product.price)}). Is it available?`)}`

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <p style={{ color: 'var(--muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <Link to="/shop">Shop</Link> / {product.name}
        </p>
        <div className="detail-grid">
          <div className="detail-media">
            <img src={product.image} alt={product.name} />
          </div>
          <div>
            <span className="product-brand">{product.brand}</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.35rem' }}>
              {product.name}
            </h1>
            <p style={{ color: 'var(--muted)' }}>{product.tagline}</p>
            <p className="price" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
              {formatUGX(product.price)}
            </p>
            <div className="delivery-line" style={{ marginBottom: '0.75rem' }}>
              <Truck size={14} /> Fast Kampala delivery · Mobile Money accepted
            </div>
            {product.unit && (
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{product.unit}</p>
            )}
            <p>{product.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', margin: '1.25rem 0' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  requireAuth(() => addToCart(product), `/product/${product.id}`)
                }
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
                {wished ? 'Saved' : 'Wishlist'}
              </button>
              {isAuthenticated ? (
                <a className="btn btn-whatsapp" href={wa} target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </a>
              ) : (
                <Link
                  to={`/signup?next=${encodeURIComponent(`/product/${product.id}`)}&reason=order`}
                  className="btn btn-whatsapp"
                >
                  Sign up to order
                </Link>
              )}
            </div>
            {!isAuthenticated && (
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                Browse freely — sign in or create an account only when you&apos;re ready to buy.
              </p>
            )}
            {product.stock <= 5 && (
              <span className="badge badge-stock">Only {product.stock} left in stock</span>
            )}
            <h3 style={{ marginTop: '2rem' }}>Benefits</h3>
            <ul className="benefits">
              {product.benefits.map((b) => (
                <li key={b}>
                  <Check size={18} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h2>You may also like</h2>
            <div className="product-grid" style={{ marginTop: '1.25rem' }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <RecentlyViewed excludeId={product.id} />
      </div>
    </section>
  )
}
