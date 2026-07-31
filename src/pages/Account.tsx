import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Account() {
  const { user, isAuthenticated, isAdmin, logout, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [saved, setSaved] = useState(false)

  if (!isAuthenticated || !user) {
    return <Navigate to="/login?next=/account" replace />
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const onSave = (e: FormEvent) => {
    e.preventDefault()
    updateProfile({ name, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <section className="section auth-section">
      <div className="container auth-card">
        <h1>My account</h1>
        <p className="auth-lead">
          Signed in as <strong>{user.email}</strong>. Your details are used to secure and
          speed up checkout.
        </p>
        <form className="form-grid" onSubmit={onSave}>
          <label>
            Full name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Phone
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label>
            Email
            <input value={user.email} disabled />
          </label>
          {saved && <p style={{ color: 'var(--success)', margin: 0 }}>Profile saved.</p>}
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </form>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link to="/checkout" className="btn btn-secondary">
            Go to checkout
          </Link>
          <button type="button" className="btn btn-outline" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </section>
  )
}
