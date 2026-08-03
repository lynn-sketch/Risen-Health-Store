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
              <span style={{ color: 'var(--gold-light)' }}>Sylivia Wanga</span>
            </div>
          </div>
          <p style={{ marginBottom: 0 }}>
            📞 {WHATSAPP_NUMBERS.display.join(' · ')}
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/order">Order Catalogue</Link></li>
            <li><Link to="/shop?cat=womens">Women&apos;s Health</Link></li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul className="footer-links">
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Risen Health Store</span>
      </div>
    </footer>
  )
}
