import { createBrowserRouter } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Tryon from './pages/Tryon'
import Recommend from './pages/recommend'
import BuyNow from './pages/BuyNow'
import PlaceOrder from './pages/PlaceOrder'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/tryon',
    element: <Tryon />,
  },
  {
    path: '/recommend',
    element: <Recommend />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/products/:id',
    element: <ProductDetail />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/buy',
    element: <BuyNow />,
  },
  {
    path: '/placeorder',
    element: <PlaceOrder />,
  },
])
