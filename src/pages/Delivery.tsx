import { WHATSAPP_NUMBERS } from '../context/StoreContext'

export function Delivery() {
  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="page-hero">
          <h1>Delivery Info</h1>
          <p style={{ color: 'var(--muted)' }}>
            Fast fulfilment across Kampala with clear communication every step.
          </p>
        </div>
        <div className="quiz-card">
          <h3>Kampala & nearby</h3>
          <p>Same-day or next-day delivery available depending on order time and stock.</p>
          <h3>Outside Kampala</h3>
          <p>Courier dispatch arranged after payment confirmation. Timelines vary by town.</p>
          <h3>Payments</h3>
          <p>MTN Mobile Money, Airtel Money, or cash on delivery (Kampala, selected areas).</p>
          <h3>Questions?</h3>
          <p>
            Call or WhatsApp Sylivia: {WHATSAPP_NUMBERS.display[0]} /{' '}
            {WHATSAPP_NUMBERS.display[1]}
          </p>
        </div>
      </div>
    </section>
  )
}
