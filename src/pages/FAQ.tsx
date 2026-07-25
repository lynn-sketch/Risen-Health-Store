const faqs = [
  {
    q: 'Are your Norland products authentic?',
    a: 'Yes. Risen Health Store stocks verified Norland, Vmax, Health Way and Nouripad products curated by Sylivia Wanga.',
  },
  {
    q: 'How do I place an order?',
    a: 'Add items to your cart and checkout via WhatsApp, or message us directly from any product page. We’ll confirm stock and payment.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'MTN Mobile Money, Airtel Money, and cash on delivery in selected Kampala areas.',
  },
  {
    q: 'Can you help me choose the right regenerative medicines?',
    a: 'Yes — take the free Health Quiz on this site, or WhatsApp Sylivia for personalised guidance.',
  },
  {
    q: 'Do products come with benefits guarantees?',
    a: 'Product benefits are based on manufacturer materials and traditional use claims. Results vary; consult a health professional for medical conditions.',
  },
]

export function FAQ() {
  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="page-hero">
          <h1>FAQ</h1>
          <p style={{ color: 'var(--muted)' }}>Quick answers before you order.</p>
        </div>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {faqs.map((f) => (
            <details
              key={f.q}
              className="quiz-card"
              style={{ padding: '1.15rem 1.25rem' }}
            >
              <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
              <p style={{ color: 'var(--muted)', marginTop: '0.75rem', marginBottom: 0 }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
