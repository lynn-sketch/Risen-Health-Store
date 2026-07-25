import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'

export function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="page-hero">
          <h1>Wishlist</h1>
          <p style={{ color: 'var(--muted)' }}>
            {items.length} saved product{items.length === 1 ? '' : 's'}
          </p>
        </div>
        {items.length === 0 ? (
          <div className="empty-state">
            <p>No favourites yet. Tap the heart on any product to save it.</p>
            <Link to="/shop" className="btn btn-primary">
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
