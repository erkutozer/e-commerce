import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import ProductDetail from '../components/ProductDetail'
import Checkout from '../components/Checkout'
import OrderSuccess from '../components/OrderSuccess'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productDetail/:id' element={<ProductDetail />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order-success' element={<OrderSuccess />} />
            </Routes>
        </div>
    )
}

export default RouterConfig