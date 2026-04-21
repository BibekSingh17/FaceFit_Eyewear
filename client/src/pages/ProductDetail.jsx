import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import '../styles/product.scss'
import Header from '../components/Header'
import { toast } from 'react-toastify'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/store/products/${id}/`
        )
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Unable to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((entry) => entry.id === item.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success(`${item.name} added to cart`)
  }

  const handleBuyNow = () => {
    navigate('/placeorder', { state: product })
  }

  return (
    <>
      <Header />
      <div className="page-container">
        {loading && <p>Loading product details...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && product && (
          <div className="detail-card">
            <img
              className="detail-image"
              src={product.image_url || '/placeholder.png'}
              alt={product.name}
            />
            <div className="detail-body">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p className="product-price">Rs {product.price.toFixed(2)}</p>
              <p>{product.in_stock > 0 ? `In stock: ${product.in_stock}` : 'Out of stock'}</p>
              <div className="detail-actions">
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.in_stock <= 0}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.in_stock <= 0}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductDetail
