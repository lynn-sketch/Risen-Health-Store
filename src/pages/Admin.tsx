import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  loadOrders,
  updateOrderStatus,
  type Order,
  type OrderStatus,
} from '../data/orders'
import { formatUSD, products } from '../data/products'

type Tab = 'overview' | 'orders' | 'customers' | 'products'

export function Admin() {
  const { listCustomers, user } = useAuth()
  const [tab, setTab] = useState<Tab>('overview')
  const [orders, setOrders] = useState<Order[]>(() => loadOrders())
  const customers = listCustomers()

  const stats = useMemo(() => {
    const revenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0)
    const pending = orders.filter((o) => o.status === 'pending').length
    return {
      orders: orders.length,
      pending,
      customers: customers.length,
      products: products.length,
      revenue,
    }
  }, [orders, customers.length])

  const setStatus = (id: string, status: OrderStatus) => {
    setOrders(updateOrderStatus(id, status))
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="page-hero">
          <h1>Admin dashboard</h1>
          <p style={{ color: 'var(--muted)' }}>
            Signed in as <strong>{user?.email}</strong>. View customers, catalogue, and
            orders placed from this browser.
          </p>
        </div>

        <div className="admin-note">
          Orders and customer accounts are saved in this device’s browser. For a shared
          store-wide admin view across phones, a server database would be needed later.
        </div>

        <div className="admin-stats">
          <div className="admin-stat">
            <ShoppingBag size={18} />
            <div>
              <strong>{stats.orders}</strong>
              <span>Orders ({stats.pending} pending)</span>
            </div>
          </div>
          <div className="admin-stat">
            <Users size={18} />
            <div>
              <strong>{stats.customers}</strong>
              <span>Customers</span>
            </div>
          </div>
          <div className="admin-stat">
            <Package size={18} />
            <div>
              <strong>{stats.products}</strong>
              <span>Products</span>
            </div>
          </div>
          <div className="admin-stat">
            <div>
              <strong>{formatUSD(stats.revenue)}</strong>
              <span>Order total</span>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          {(
            [
              ['overview', 'Overview'],
              ['orders', 'Orders'],
              ['customers', 'Customers'],
              ['products', 'Products'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? 'active' : ''}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="quiz-card">
            <h3>Quick view</h3>
            <p style={{ color: 'var(--muted)' }}>
              Latest orders and sign-ups from people using this same browser/device.
            </p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id}>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                      <td>
                        {o.customerName}
                        <br />
                        <small>{o.customerPhone}</small>
                      </td>
                      <td>{formatUSD(o.total)}</td>
                      <td>
                        <span className={`admin-badge status-${o.status}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={4}>No orders yet. They appear when checkout opens WhatsApp.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Link to="/shop" className="btn btn-outline" style={{ marginTop: '1rem' }}>
              Open shop
            </Link>
          </div>
        )}

        {tab === 'orders' && (
          <div className="quiz-card">
            <h3>All orders</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                      <td>
                        <strong>{o.customerName}</strong>
                        <br />
                        <small>{o.customerEmail}</small>
                        <br />
                        <small>
                          {o.customerPhone} · {o.area}
                        </small>
                        {o.notes ? (
                          <>
                            <br />
                            <small>Note: {o.notes}</small>
                          </>
                        ) : null}
                      </td>
                      <td>
                        {o.items.map((i) => (
                          <div key={`${o.id}-${i.productId}`}>
                            {i.name} × {i.qty}
                          </div>
                        ))}
                      </td>
                      <td>{formatUSD(o.total)}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            setStatus(o.id, e.target.value as OrderStatus)
                          }
                        >
                          <option value="pending">pending</option>
                          <option value="confirmed">confirmed</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5}>No orders recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'customers' && (
          <div className="quiz-card">
            <h3>Customer accounts</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={4}>No customer sign-ups on this device yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div className="quiz-card">
            <h3>Catalogue ({products.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.brand}</td>
                      <td>{p.category}</td>
                      <td>{formatUSD(p.price)}</td>
                      <td>{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
