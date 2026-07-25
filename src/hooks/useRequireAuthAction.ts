import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Run an action only when signed in; otherwise send user to the signup page. */
export function useRequireAuthAction() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (action: () => void, nextPath?: string) => {
    if (isAuthenticated) {
      action()
      return true
    }
    const next = nextPath || location.pathname + location.search || '/shop'
    navigate(`/signup?next=${encodeURIComponent(next)}&reason=order`, {
      replace: false,
    })
    return false
  }
}
