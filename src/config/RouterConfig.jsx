import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import ProductDetail from '../components/ProductDetail'
import Checkout from '../components/Checkout'
import OrderSuccess from '../components/OrderSuccess'
import NoPageFound from '../components/NoPageFound'
import Login from '../components/Login'
import Register from '../components/Register'
import ProtectedRoute from '../components/ProtectedRoute'
import OrderList from '../components/OrderList'
import OrderDetails from '../components/OrderDetails'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productDetail/:id' element={<ProductDetail />} />
                <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/order-success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route path='/orders' element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
                <Route path='/orders/:orderNumber' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

                <Route path='*' element={<NoPageFound />} />
            </Routes>
        </div>
    )
}

export default RouterConfig