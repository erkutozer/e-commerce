import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import ProductDetail from '../components/ProductDetail'
import Checkout from '../components/Checkout'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productDetail/:id' element={<ProductDetail />} />
                <Route path='/checkout' element={<Checkout />} />
            </Routes>
        </div>
    )
}

export default RouterConfig