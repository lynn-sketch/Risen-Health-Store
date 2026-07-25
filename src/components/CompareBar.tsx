import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { getProduct } from '../data/products'

export function CompareBar() {
  const { compareIds, toggleCompare } = useStore()
  if (compareIds.length === 0) return null

  return (
    <div className="compare-bar">
      <div className="compare-bar-text">
        Comparing {compareIds.length}/3:{' '}
        {compareIds.map((id) => getProduct(id)?.name).filter(Boolean).join(' · ')}
      </div>
      <button
        type="button"
        className="btn btn-ghost"
        style={{ color: 'var(--cream)', fontSize: '0.8rem' }}
        onClick={() => compareIds.forEach((id) => toggleCompare(id))}
      >
        Clear
      </button>
      <Link to="/compare" className="btn btn-primary" style={{ padding: '0.55rem 0.9rem' }}>
        View
      </Link>
    </div>
  )
}
