import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { products, type Product } from '../data/products'

const questions = [
  {
    id: 'goal',
    prompt: 'What is your top wellness goal right now?',
    options: [
      { label: 'Boost immunity & stay resilient', tags: ['immunity', 'immune', 'antioxidant'] },
      { label: 'Digestive comfort & gut health', tags: ['digestion', 'gastric', 'stomach', 'bowel'] },
      { label: 'Energy, vitality & anti-aging', tags: ['energy', 'anti-aging', 'longevity', 'nmn'] },
      { label: 'Heart, brain & cholesterol', tags: ['heart', 'brain', 'cholesterol', 'omega'] },
      { label: 'Women’s hormonal & fertility care', tags: ['female', 'hormone', 'fertility', 'glow'] },
      { label: 'Men’s vitality & prostate support', tags: ['male', 'prostate', 'libido', 'stamina'] },
    ],
  },
  {
    id: 'concern',
    prompt: 'Any secondary concern?',
    options: [
      { label: 'Blood sugar balance', tags: ['blood sugar', 'diabetes', 'hypoglycemic'] },
      { label: 'Joints, bones or calcium', tags: ['joint', 'bone', 'calcium', 'arthritis'] },
      { label: 'Respiratory & allergies', tags: ['respiratory', 'lung', 'allerg', 'asthma'] },
      { label: 'Eye health & vision', tags: ['eye', 'vision', 'sight'] },
      { label: 'Stress, sleep or recovery', tags: ['stress', 'sleep', 'recovery', 'fatigue'] },
      { label: 'Skin glow & beauty from within', tags: ['skin', 'glow', 'beauty', 'pigment'] },
    ],
  },
  {
    id: 'format',
    prompt: 'Preferred product format?',
    options: [
      { label: 'Capsules / softgels', tags: ['capsule', 'softgel', 'supplement'] },
      { label: 'Functional coffee or tea', tags: ['coffee', 'tea'] },
      { label: 'Devices & tools', tags: ['device', 'bracelet', 'cup', 'therapy'] },
      { label: 'Open to anything recommended', tags: [] },
    ],
  },
]

function scoreProduct(product: Product, tags: string[]): number {
  const hay = `${product.name} ${product.tagline} ${product.description} ${product.benefits.join(' ')} ${product.category}`.toLowerCase()
  return tags.reduce((score, tag) => (hay.includes(tag.toLowerCase()) ? score + 1 : score), 0)
}

export function Assessment() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [done, setDone] = useState(false)

  const progress = done ? 100 : (step / questions.length) * 100

  const recommendations = useMemo(() => {
    if (!done) return []
    const tags = answers.flat()
    return [...products]
      .map((p) => ({ product: p, score: scoreProduct(p, tags) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.product)
  }, [answers, done])

  const select = (tags: string[]) => {
    const next = [...answers]
    next[step] = tags
    setAnswers(next)
    if (step < questions.length - 1) setStep(step + 1)
    else setDone(true)
  }

  const reset = () => {
    setStep(0)
    setAnswers([])
    setDone(false)
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="page-hero">
          <h1>Free Health Quiz</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '46ch' }}>
            Answer three quick questions — we’ll match you with products from Sylivia’s
            curated catalogue.
          </p>
        </div>

        <div className="quiz-card">
          <div className="progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>

          {!done ? (
            <>
              <p style={{ color: 'var(--gold-dim)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Question {step + 1} of {questions.length}
              </p>
              <h2 style={{ fontSize: '1.85rem' }}>{questions[step].prompt}</h2>
              <div className="quiz-options">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className="quiz-option"
                    onClick={() => select(opt.tags)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
                  Back
                </button>
              )}
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '1.85rem' }}>Your personalised picks</h2>
              <p style={{ color: 'var(--muted)' }}>
                Based on your answers, here are the strongest matches. Confirm with Sylivia
                on WhatsApp before starting any new regimen.
              </p>
              {recommendations.length === 0 ? (
                <p>We couldn’t narrow it down — browse the full shop instead.</p>
              ) : (
                <div className="product-grid" style={{ marginTop: '1.5rem' }}>
                  {recommendations.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={reset}>
                  Retake Quiz
                </button>
                <Link to="/shop" className="btn btn-primary">
                  Browse All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
