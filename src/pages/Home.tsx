import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { CATEGORIES, getBestSellers, getFeatured } from '../data/products'

export function Home() {
  const featured = getFeatured().slice(0, 4)
  const bestsellers = getBestSellers().slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="hero-brand">
              Risen <em>Health</em> Store
            </p>
            <h1>Wellness products for Uganda.</h1>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-primary">
                Shop now <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="trust-strip">
        {[
          { t: 'Kampala Delivery', i: Truck },
          { t: 'Authentic Stock', i: ShieldCheck },
          { t: 'WhatsApp Orders', i: Sparkles },
        ].map(({ t, i: Icon }) => (
          <div className="trust-item" key={t}>
            <Icon size={18} color="var(--gold-dim)" style={{ marginBottom: 4 }} />
            <strong>{t}</strong>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Categories</h2>
            <Link to="/shop" className="link-arrow">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="cat-grid">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/shop?cat=${cat.id}`} className="cat-tile" style={{ display: 'block' }}>
                  <strong>{cat.label}</strong>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>Featured</h2>
            <Link to="/shop" className="link-arrow">
              Shop <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container spotlight">
          <div className="spotlight-copy">
            <h2>Women&apos;s wellness</h2>
            <Link to="/shop?cat=womens" className="btn btn-secondary">
              Shop collection
            </Link>
          </div>
          <motion.div
            className="spotlight-visual"
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Best sellers</h2>
            <Link to="/order" className="link-arrow">
              Catalogue <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
