import { useState, type FormEvent } from 'react'
import { WHATSAPP_NUMBERS } from '../context/StoreContext'

const DEMO: Record<string, { status: string; steps: string[] }> = {
  RHS1001: {
    status: 'Out for delivery',
    steps: ['Order received', 'Payment confirmed', 'Packed', 'Out for delivery'],
  },
  RHS1002: {
    status: 'Packed',
    steps: ['Order received', 'Payment confirmed', 'Packed'],
  },
}

export function TrackOrder() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<(typeof DEMO)[string] | null | 'none'>(null)

  const track = (e: FormEvent) => {
    e.preventDefault()
    const key = code.trim().toUpperCase()
    setResult(DEMO[key] ?? 'none')
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="page-hero">
          <h1>Track Order</h1>
          <p style={{ color: 'var(--muted)' }}>
            Enter the order code Sylivia shared with you (try demo: RHS1001).
          </p>
        </div>
        <form className="form-grid" onSubmit={track}>
          <label>
            Order code
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. RHS1001"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Track
          </button>
        </form>

        {result && result !== 'none' && (
          <div className="quiz-card" style={{ marginTop: '1.5rem' }}>
            <h3>Status: {result.status}</h3>
            <ol style={{ paddingLeft: '1.2rem', color: 'var(--muted)' }}>
              {result.steps.map((s) => (
                <li key={s} style={{ marginBottom: 6 }}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        )}

        {result === 'none' && (
          <div className="quiz-card" style={{ marginTop: '1.5rem' }}>
            <p>
              We couldn’t find that code online. WhatsApp Sylivia on{' '}
              <a href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}>
                {WHATSAPP_NUMBERS.display[0]}
              </a>{' '}
              for a live update.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
