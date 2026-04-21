import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../styles/cart.scss'
import Header from '../components/Header'
import { toast } from 'react-toastify'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(saved)
  }, [])

  const saveCart = (items) => {
    localStorage.setItem('cart', JSON.stringify(items))
    setCartItems(items)
  }

  const handleQuantityChange = (id, change) => {
    const updated = cartItems.map((item) => {
      if (item.id !== id) return item
      const quantity = Math.max(1, item.quantity + change)
      return { ...item, quantity }
    })
    saveCart(updated)
  }

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id)
    saveCart(updated)
    toast.info('Item removed from cart')
  }

  const handleCheckout = () => {
    if (!cartItems.length) {
      toast.warn('Your cart is empty')
      return
    }
    navigate('/buy', { state: { items: cartItems } })
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )

  return (
    <>
      <Header />
      <div className="page-container">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add some products first.</p>
        ) : (
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img
                  className="cart-image"
                  src={item.image_url || '/placeholder.png'}
                  alt={item.name}
                />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Rs {item.price.toFixed(2)}</p>
                  <div className="cart-quantity">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div>Total: Rs {totalPrice.toFixed(2)}</div>
          <button onClick={handleCheckout} disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
