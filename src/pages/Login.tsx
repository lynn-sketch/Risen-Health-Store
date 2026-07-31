import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { ADMIN_EMAIL, useAuth } from '../context/AuthContext'
import { ShieldCheck } from 'lucide-react'

export function Login() {
  const { login, isAuthenticated, isAdmin } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const next = params.get('next') || '/checkout'
  const reason = params.get('reason')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? (next.startsWith('/admin') ? next : '/admin') : next} replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    const goAdmin =
      email.trim().toLowerCase() === ADMIN_EMAIL || next.startsWith('/admin')
    navigate(goAdmin ? '/admin' : next, { replace: true })
  }

  return (
    <section className="section auth-section">
      <div className="container auth-card">
        <div className="auth-badge">
          <ShieldCheck size={18} /> Secure ordering
        </div>
        <h1>Sign in</h1>
        <p className="auth-lead">
          {reason === 'order'
            ? 'Create or sign in to your account before placing an order. Browsing stays free for everyone.'
            : 'Welcome back to Risen Health Store.'}
        </p>
        <form className="form-grid" onSubmit={onSubmit}>
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
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in to order'}
          </button>
        </form>
        <p className="auth-switch">
          New here?{' '}
          <Link to={`/signup?next=${encodeURIComponent(next)}`}>Create an account</Link>
        </p>
        <Link to="/shop" className="auth-browse">
          Continue browsing without signing in →
        </Link>
      </div>
    </section>
  )
}
