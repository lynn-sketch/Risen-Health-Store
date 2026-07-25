import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldCheck } from 'lucide-react'

export function Signup() {
  const { signup, isAuthenticated } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const next = params.get('next') || '/checkout'
  const reason = params.get('reason')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isAuthenticated) {
    return <Navigate to={next} replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    const res = await signup({ name, email, phone, password })
    setLoading(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(next, { replace: true })
  }

  return (
    <section className="section auth-section">
      <div className="container auth-card">
        <div className="auth-badge">
          <ShieldCheck size={18} /> Secure ordering
        </div>
        <h1>Create account</h1>
        <p className="auth-lead">
          {reason === 'order'
            ? 'Sign up to add items to your cart and place an order. Browsing stays free for everyone.'
            : 'Sign up once to place orders safely. Anyone can still browse products without an account.'}
        </p>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Phone (MTN / Airtel)
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="07…"
              autoComplete="tel"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating…' : 'Sign up & continue'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{' '}
          <Link to={`/login?next=${encodeURIComponent(next)}&reason=order`}>Sign in</Link>
        </p>
        {reason !== 'order' && (
          <Link to="/shop" className="auth-browse">
            Continue browsing without signing in →
          </Link>
        )}
      </div>
    </section>
  )
}
