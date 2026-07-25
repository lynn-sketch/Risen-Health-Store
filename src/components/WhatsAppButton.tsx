import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBERS } from '../context/StoreContext'

export function WhatsAppButton() {
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent('Hello Risen Health Store! I need help choosing a product.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>Chat with us</span>
    </a>
  )
}
