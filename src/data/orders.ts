export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled'

export interface OrderLine {
  productId: string
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  createdAt: string
  customerName: string
  customerEmail: string
  customerPhone: string
  area: string
  notes: string
  items: OrderLine[]
  total: number
  status: OrderStatus
}

const ORDERS_KEY = 'rhs-orders'

export function loadOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') as Order[]
  } catch {
    return []
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function addOrder(
  input: Omit<Order, 'id' | 'createdAt' | 'status'>,
): Order {
  const order: Order = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
  }
  const orders = loadOrders()
  orders.unshift(order)
  saveOrders(orders)
  return order
}

export function updateOrderStatus(id: string, status: OrderStatus): Order[] {
  const orders = loadOrders().map((o) => (o.id === id ? { ...o, status } : o))
  saveOrders(orders)
  return orders
}
