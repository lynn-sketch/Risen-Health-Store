import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

interface StoredUser extends User {
  passwordHash: string
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  signup: (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => Promise<{ ok: true } | { ok: false; error: string }>
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  logout: () => void
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone'>>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const USERS_KEY = 'rhs-users'
const SESSION_KEY = 'rhs-session'

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`rhs:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as StoredUser[]
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toPublic(u: StoredUser): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    createdAt: u.createdAt,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') as User | null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  const signup: AuthContextValue['signup'] = async ({
    name,
    email,
    phone,
    password,
  }) => {
    const cleanEmail = email.trim().toLowerCase()
    if (!name.trim() || !cleanEmail || !phone.trim() || password.length < 6) {
      return {
        ok: false,
        error: 'Please fill all fields. Password must be at least 6 characters.',
      }
    }
    const users = loadUsers()
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists. Please sign in.' }
    }
    const passwordHash = await hashPassword(password)
    const stored: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      passwordHash,
      createdAt: new Date().toISOString(),
    }
    users.push(stored)
    saveUsers(users)
    setUser(toPublic(stored))
    return { ok: true }
  }

  const login: AuthContextValue['login'] = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase()
    const users = loadUsers()
    const found = users.find((u) => u.email === cleanEmail)
    if (!found) return { ok: false, error: 'No account found with that email. Please sign up.' }
    const passwordHash = await hashPassword(password)
    if (found.passwordHash !== passwordHash) {
      return { ok: false, error: 'Incorrect password. Try again.' }
    }
    setUser(toPublic(found))
    return { ok: true }
  }

  const logout = () => setUser(null)

  const updateProfile = (data: Partial<Pick<User, 'name' | 'phone'>>) => {
    if (!user) return
    const users = loadUsers()
    const idx = users.findIndex((u) => u.id === user.id)
    if (idx < 0) return
    users[idx] = {
      ...users[idx],
      name: data.name?.trim() || users[idx].name,
      phone: data.phone?.trim() || users[idx].phone,
    }
    saveUsers(users)
    setUser(toPublic(users[idx]))
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signup,
      login,
      logout,
      updateProfile,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
