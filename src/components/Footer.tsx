import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBERS } from '../context/StoreContext'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand" style={{ marginBottom: '1rem' }}>
            <div className="brand-mark">R</div>
            <div className="brand-text">
              <strong>Risen Health Store</strong>
              <span style={{ color: 'var(--gold-light)' }}>Premium wellness Uganda</span>
            </div>
          </div>
          <p>
            Authentic Norland, Vmax and Health Way products — curated by Sylivia Wanga
            for families who invest in lasting vitality.
          </p>
          <p style={{ marginBottom: 0 }}>
            📞 {WHATSAPP_NUMBERS.display.join(' · ')}
            <br />
            💬 WhatsApp orders: {WHATSAPP_NUMBERS.display[0]}
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><Link to="/order">Order Catalogue</Link></li>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?cat=regenerative">Regenerative Medicines</Link></li>
            <li><Link to="/shop?cat=coffee-tea">Coffee & Tea</Link></li>
            <li><Link to="/shop?cat=devices">Therapy Devices</Link></li>
            <li><Link to="/shop?cat=womens">Women&apos;s Health</Link></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul className="footer-links">
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/delivery">Delivery Info</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/assessment">Health Quiz</Link></li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Order
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Sylivia</Link></li>
            <li><Link to="/signup">Create account</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/compare">Compare Products</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Risen Health Store · Sylivia Wanga</span>
        <span>MTN · Airtel Money · Secure WhatsApp checkout</span>
      </div>
    </footer>
  )
}
