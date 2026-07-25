import { Phone } from 'lucide-react'
import { WHATSAPP_NUMBERS } from '../context/StoreContext'

export function About() {
  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container about-grid">
        <div className="about-panel">
          <div className="role">Owner & Wellness Curator</div>
          <h2>Sylivia Wanga</h2>
          <p style={{ color: 'rgba(244,239,228,0.85)' }}>
            Building Risen Health Store so Ugandan families can access authentic Norland
            and Vmax products with trusted guidance — not guesswork.
          </p>
          <div className="contact-chips">
            <a className="contact-chip" href={`tel:+${WHATSAPP_NUMBERS.primary}`}>
              <Phone size={16} /> {WHATSAPP_NUMBERS.display[0]}
            </a>
            <a className="contact-chip" href={`tel:+${WHATSAPP_NUMBERS.secondary}`}>
              <Phone size={16} /> {WHATSAPP_NUMBERS.display[1]}
            </a>
            <a
              className="contact-chip"
              href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>About Risen Health Store</h1>
          <p>
            Risen Health Store is an advanced wellness boutique inspired by the best of
            East African Norland retail — elevated with smarter product matching, wishlist
            & compare tools, WhatsApp-first checkout, and the official Risen Group brand
            colours (calm blue and gold).
          </p>
          <p>
            We stock regenerative medicines, herbal formulas, functional coffee & tea,
            women’s and men’s care, beauty essentials and therapy devices — including Fish
            Oil, Seabuckthorn Oil, NMN, GI Vital, Immune+, Alkaline Cup and more.
          </p>
          <p>
            Every order is personally handled. Message Sylivia for availability, dosing
            guidance and Kampala delivery options.
          </p>
          <h3 style={{ marginTop: '1.75rem' }}>Why shop with us</h3>
          <ul className="benefits">
            {[
              'Authentic Norland / Vmax / Health Way stock',
              'Personal recommendations via Health Quiz + WhatsApp',
              'Mobile money friendly payments',
              'Wishlist, compare and saved cart on your device',
              'Clear UGX pricing and stock visibility',
            ].map((item) => (
              <li key={item}>
                <span style={{ color: 'var(--gold-dim)', fontWeight: 800 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
