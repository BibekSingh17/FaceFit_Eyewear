import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../styles/product.scss'
import Header from '../components/Header'
import { toast } from 'react-toastify'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/store/products/')
        if (!response.ok) {
          throw new Error('Failed to load products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Unable to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success(`${product.name} added to cart`)
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <h1>Shop Products</h1>
        {loading && <p>Loading products...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>No products are available at the moment.</p>
        )}

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                className="product-image"
                src={product.image_url || '/placeholder.png'}
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                {/* <p>{product.description}</p> */}
                <p className="product-price">Rs {product.price.toFixed(2)}</p>
                <p className="product-stock">
                  {product.in_stock > 0 ? `In stock: ${product.in_stock}` : 'Out of stock'}
                </p>
              </div>
              <div className="product-actions">
                <button onClick={() => navigate(`/products/${product.id}`)}>
                  View Details
                </button>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.in_stock <= 0}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate('/placeorder', { state: product })}
                  disabled={product.in_stock <= 0}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
