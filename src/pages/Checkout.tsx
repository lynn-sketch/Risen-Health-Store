import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { addOrder } from '../data/orders'
import { formatUSD } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { buildWhatsAppOrder, useStore, WHATSAPP_NUMBERS } from '../context/StoreContext'

export function Checkout() {
  const { cart, cartTotal, clearCart } = useStore()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('Kampala')
  const [notes, setNotes] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setPhone(user.phone)
    }
  }, [user])

  if (cart.length === 0 && !sent) {
    return (
      <section className="section container empty-state">
        <h1>Checkout</h1>
        <p>Your basket is empty.</p>
        <Link to="/shop" className="btn btn-primary">
          Shop Products
        </Link>
      </section>
    )
  }

  const recordOrder = () => {
    addOrder({
      customerName: name || user?.name || 'Customer',
      customerEmail: user?.email || '',
      customerPhone: phone || user?.phone || '',
      area,
      notes,
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
      })),
      total: cartTotal,
    })
  }

  const openWhatsApp = () => {
    const lines = cart.map(
      (i) => `• ${i.product.name} × ${i.qty} — ${formatUSD(i.product.price * i.qty)}`,
    )
    const message = [
      'Hello Risen Health Store!',
      `Verified customer account: ${user?.email || 'N/A'}`,
      `Customer: ${name || 'N/A'}`,
      `Phone: ${phone || 'N/A'}`,
      `Area: ${area}`,
      notes ? `Notes: ${notes}` : '',
      '',
      'Order:',
      ...lines,
      '',
      `Total: ${formatUSD(cartTotal)}`,
      '',
      'Please confirm payment (MTN/Airtel) and delivery.',
    ]
      .filter(Boolean)
      .join('\n')

    recordOrder()
    window.open(
      `https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(message)}`,
      '_blank',
    )
    setSent(true)
    clearCart()
  }

  if (sent) {
    return (
      <section className="section container" style={{ maxWidth: 640 }}>
        <h1>Almost done — tap Send on WhatsApp</h1>
        <div className="wa-notice">
          <MessageCircle size={22} />
          <div>
            <strong>WhatsApp should have opened with your order ready.</strong>
            <p>
              On WhatsApp, press the green <strong>Send</strong> button. Sylivia only receives
              your order after you send it to {WHATSAPP_NUMBERS.display[0]}.
            </p>
          </div>
        </div>
        <p style={{ color: 'var(--muted)' }}>
          If WhatsApp did not open, use the button below, then tap Send.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
            target="_blank"
            rel="noreferrer"
          >
            Open WhatsApp again
          </a>
          <Link to="/shop" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container checkout-layout">
        <div>
          <h1>Secure checkout</h1>
          <p style={{ color: 'var(--muted)' }}>
            Signed in as <strong>{user?.email}</strong>. Confirm your details — we finalise
            payment & delivery on WhatsApp.
          </p>

          <div className="wa-notice" style={{ marginTop: '1.25rem' }}>
            <MessageCircle size={22} />
            <div>
              <strong>Important: WhatsApp will open — you must tap Send</strong>
              <p>
                Your order is not delivered to Sylivia until you press Send in WhatsApp. Opening
                the chat alone is not enough.
              </p>
            </div>
          </div>

          <div className="form-grid" style={{ marginTop: '1.5rem' }}>
            <label>
              Full name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Phone number
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07…"
                required
              />
            </label>
            <label>
              Delivery area
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                <option>Kampala</option>
                <option>Entebbe</option>
                <option>Wakiso</option>
                <option>Other (specify in notes)</option>
              </select>
            </label>
            <label>
              Notes (optional)
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Landmark, preferred time, payment method…"
              />
            </label>
            <button type="button" className="btn btn-whatsapp" onClick={openWhatsApp}>
              Place Order on WhatsApp
            </button>
            <p className="wa-step-hint">
              Next: WhatsApp opens → check the message → tap <strong>Send</strong>
            </p>
            <a
              className="btn btn-outline"
              href={buildWhatsAppOrder(cart, cartTotal)}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                recordOrder()
                setSent(true)
                clearCart()
              }}
            >
              Quick WhatsApp (cart only)
            </a>
          </div>
        </div>
        <aside className="summary-box">
          <h3>Order summary</h3>
          {cart.map((i) => (
            <div
              key={i.product.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 8,
                padding: '0.55rem 0',
                borderBottom: '1px solid rgba(27,79,114,0.06)',
                fontSize: '0.92rem',
              }}
            >
              <span>
                {i.product.name} × {i.qty}
              </span>
              <strong>{formatUSD(i.product.price * i.qty)}</strong>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
              fontSize: '1.1rem',
            }}
          >
            <span>Total</span>
            <strong>{formatUSD(cartTotal)}</strong>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '0.75rem' }}>
            Pay via MTN MoMo or Airtel Money after Sylivia confirms on WhatsApp.
          </p>
        </aside>
      </div>
    </section>
  )
}
