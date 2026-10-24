import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Product.css'

function Product({ product }) {

    const { id, images, price, title, thumbnail } = product;
    const navigate = useNavigate();

    return (
        <div className='card'>
            <img className='image' src={images?.[0] || thumbnail} alt="" />
            <div>
                <p style={{ textAlign: 'center', height: '50px' }}>Ürün adı : {title}</p>
                <h3 style={{ textAlign: 'center' }}>Fiyatı : {price}$</h3>
            </div>

            <div className='flex-row'>
                <button className='detail-button' onClick={() => navigate('/productDetail/' + id)} >Detaya git</button>
            </div>
        </div>
    )
}

export default Product