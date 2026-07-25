import { Link } from 'react-router-dom'
import { formatUGX, getProduct } from '../data/products'
import { useStore } from '../context/StoreContext'

export function Compare() {
  const { compareIds, toggleCompare, addToCart } = useStore()
  const items = compareIds.map((id) => getProduct(id)).filter(Boolean)

  if (items.length === 0) {
    return (
      <section className="section container empty-state">
        <h1>Compare Products</h1>
        <p>Select up to 3 products using the compare icon on product cards.</p>
        <Link to="/shop" className="btn btn-primary">
          Go to Shop
        </Link>
      </section>
    )
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="page-hero">
          <h1>Compare Products</h1>
          <p style={{ color: 'var(--muted)' }}>Side-by-side benefits & pricing</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>Feature</th>
                {items.map((p) => (
                  <th key={p!.id} style={{ textAlign: 'left', padding: '0.75rem', minWidth: 180 }}>
                    <img
                      src={p!.image}
                      alt=""
                      style={{ width: '100%', height: 120, objectFit: 'cover', marginBottom: 8 }}
                    />
                    <div>{p!.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Brand', (p: NonNullable<(typeof items)[0]>) => p.brand],
                ['Price', (p: NonNullable<(typeof items)[0]>) => formatUGX(p.price)],
                ['Category', (p: NonNullable<(typeof items)[0]>) => p.category],
                ['Stock', (p: NonNullable<(typeof items)[0]>) => `${p.stock} available`],
                ['Tagline', (p: NonNullable<(typeof items)[0]>) => p.tagline],
                [
                  'Top benefits',
                  (p: NonNullable<(typeof items)[0]>) => p.benefits.slice(0, 4).join(' · '),
                ],
              ].map(([label, fn]) => (
                <tr key={label as string} style={{ borderTop: '1px solid rgba(11,29,54,0.08)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 700 }}>{label as string}</td>
                  {items.map((p) => (
                    <td key={p!.id} style={{ padding: '0.85rem', color: 'var(--muted)' }}>
                      {(fn as (p: NonNullable<(typeof items)[0]>) => string)(p!)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid rgba(11,29,54,0.08)' }}>
                <td style={{ padding: '0.85rem' }} />
                {items.map((p) => (
                  <td key={p!.id} style={{ padding: '0.85rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => addToCart(p!)}
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => toggleCompare(p!.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
