import { motion } from 'framer-motion'
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Truck, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { CATEGORIES, getBestSellers, getFeatured } from '../data/products'

export function Home() {
  const featured = getFeatured().slice(0, 6)
  const bestsellers = getBestSellers().slice(0, 8)

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="hero-brand">
              Risen <em>Health</em> Store
            </p>
            <h1>Wellness that rises with you — authentic Norland & Vmax in Uganda.</h1>
            <p>
              Curated by Sylivia Wanga. Premium regenerative medicines, herbal care and
              therapy devices — ordered in minutes on WhatsApp.
            </p>
            <div className="hero-cta">
              <Link to="/order" className="btn btn-primary">
                Order Catalogue <ArrowRight size={18} />
              </Link>
              <Link to="/assessment" className="btn btn-outline" style={{ borderColor: 'rgba(255,252,247,0.5)', color: 'var(--white)' }}>
                Free Health Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="trust-strip">
        {[
          { t: 'Kampala Delivery', d: 'Fast fulfilment on every order', i: Truck },
          { t: '100% Authentic', d: 'Verified Norland & Vmax stock', i: ShieldCheck },
          { t: 'Mobile Money', d: 'MTN, Airtel & cash on delivery', i: Zap },
          { t: 'Expert Guidance', d: 'Personal advice from Sylivia', i: Sparkles },
        ].map(({ t, d, i: Icon }) => (
          <div className="trust-item" key={t}>
            <Icon size={20} color="var(--gold-dim)" style={{ marginBottom: 6 }} />
            <strong>{t}</strong>
            <span>{d}</span>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Shop by Category</h2>
              <p>Find the right support for immunity, digestion, vitality and beauty.</p>
            </div>
            <Link to="/shop" className="link-arrow">
              All Products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="cat-grid">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/shop?cat=${cat.id}`} className="cat-tile" style={{ display: 'block' }}>
                  <span>Browse</span>
                  <strong>{cat.label}</strong>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="assess-banner">
            <div style={{ position: 'relative' }}>
              <div className="eyebrow">Free · Smart Matching</div>
              <h2>Not sure where to start?</h2>
              <p>
                Take our 2-minute health quiz for personalised product recommendations —
                an upgraded guide beyond a basic catalogue.
              </p>
              <Link to="/assessment" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Start Assessment <ArrowRight size={18} />
              </Link>
            </div>
            <div style={{ position: 'relative', fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold-light)', fontStyle: 'italic' }}>
              “Be smart. Be strong. Be timeless.”
              <div style={{ marginTop: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontStyle: 'normal', color: 'rgba(244,239,228,0.7)' }}>
                Inner health · Outer beauty · Timeless confidence
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured Products</h2>
              <p>Hero picks from our Norland & Vmax collection.</p>
            </div>
            <Link to="/shop" className="link-arrow">
              See All <ArrowRight size={16} />
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
            <h2>A smart woman invests in her health.</h2>
            <p className="gold-line">She glows differently. She ages slowly. She shines forever.</p>
            <p>
              From Immune+ and Beta-Carotene to GI Vital and Anti-Pigmenty care —
              build a daily ritual that strengthens immunity, digestion and your natural glow.
            </p>
            <ul className="feature-list">
              {[
                { t: 'Stronger Immunity', d: 'Helps strengthen your body’s natural defence.', i: ShieldCheck },
                { t: 'Better Digestion', d: 'Supports gut health and nutrient absorption.', i: Leaf },
                { t: 'Healthy Glow', d: 'Nourishes skin from within for a natural glow.', i: Sparkles },
                { t: 'Daily Wellness', d: 'Essential nutrition for energy, vitality & balance.', i: Zap },
              ].map(({ t, d, i: Icon }) => (
                <li key={t}>
                  <span className="icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{t}</strong>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/shop?cat=womens" className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
              Shop Women&apos;s Wellness
            </Link>
          </div>
          <motion.div
            className="spotlight-visual"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Best Sellers</h2>
              <p>What Uganda’s wellness community orders most.</p>
            </div>
            <Link to="/shop" className="link-arrow">
              Full Catalogue <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="newsletter">
            <div>
              <h2>Health tips & exclusive deals</h2>
              <p>
                Join Sylivia’s list for wellness tips, new arrivals, and member-only offers.
                No spam — unsubscribe anytime.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                const email = String(fd.get('email') || '')
                window.open(
                  `https://wa.me/256787770484?text=${encodeURIComponent(`Please add me to the Risen Health Store tips list: ${email}`)}`,
                  '_blank',
                )
              }}
            >
              <input name="email" type="email" required placeholder="Your email address" />
              <button type="submit" className="btn btn-secondary">
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
