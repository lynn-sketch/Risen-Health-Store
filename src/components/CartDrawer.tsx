import { useEffect } from 'react'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatUGX } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { buildWhatsAppOrder, useStore } from '../context/StoreContext'

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    cartTotal,
  } = useStore()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  return (
    <>
      <div
        className={`drawer-backdrop ${cartOpen ? 'open' : ''}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen}>
        <div className="drawer-head">
          <h3 style={{ margin: 0 }}>Your Basket</h3>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-state">
              <p>Your basket is empty. Add products you love.</p>
              <Link
                to="/shop"
                className="btn btn-primary"
                onClick={() => setCartOpen(false)}
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-line" key={item.product.id}>
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <strong>{item.product.name}</strong>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    {formatUGX(item.product.price)}
                  </div>
                  <div className="qty-ctrl">
                    <button
                      type="button"
                      onClick={() => updateQty(item.product.id, item.qty - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.product.id, item.qty + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total</span>
              <strong>{formatUGX(cartTotal)}</strong>
            </div>
            {!isAuthenticated && (
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>
                Sign in required to checkout or place an order.
              </p>
            )}
            <Link
              to={isAuthenticated ? '/checkout' : '/signup?next=/checkout&reason=order'}
              className="btn btn-primary"
              onClick={() => setCartOpen(false)}
            >
              {isAuthenticated ? 'Checkout' : 'Sign up to checkout'}
            </Link>
            {isAuthenticated ? (
              <>
                <a
                  className="btn btn-whatsapp"
                  href={buildWhatsAppOrder(cart, cartTotal)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order via WhatsApp
                </a>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>
                  WhatsApp will open — tap <strong>Send</strong> so Sylivia receives your order.
                </p>
              </>
            ) : (
              <Link
                to="/signup?next=/checkout&reason=order"
                className="btn btn-whatsapp"
                onClick={() => setCartOpen(false)}
              >
                Sign up to order on WhatsApp
              </Link>
            )}
          </div>
        )}
      </aside>
    </>
  )
}
