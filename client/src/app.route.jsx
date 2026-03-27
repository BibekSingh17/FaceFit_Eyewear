import {createBrowserRouter} from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Tryon from './pages/Tryon'

export const router =  createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/tryon',
        element: <Tryon/>
    }

])