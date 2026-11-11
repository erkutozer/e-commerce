import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import ProductDetail from '../components/ProductDetail'
import Checkout from '../components/Checkout'
import OrderSuccess from '../components/OrderSuccess'
import NoPageFound from '../components/NoPageFound'
import Login from '../components/Login'
import Register from '../components/Register'
import ProtectedRoute from '../components/ProtectedRoute'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productDetail/:id' element={<ProductDetail />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order-success' element={<OrderSuccess />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/checkout' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route path='*' element={<NoPageFound />} />
            </Routes>
        </div>
    )
}

export default RouterConfig