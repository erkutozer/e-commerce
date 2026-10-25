import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalPrice } from '../redux/basketSlice';
import { useNavigate } from 'react-router-dom';

function Checkout() {

    const { basket } = useSelector(store => store.basket);
    const totalPrice = useSelector(selectTotalPrice);
    const navigate = useNavigate();

    if (basket.length === 0) {
        return (
            <div className='flex-column' style={{ marginTop: '50px' }}>
                <p>Sepetiniz boş, ödeme yapılacak ürün yok.</p>
                <button onClick={() => navigate('/')} >Alışverişe geri dön</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>
            <h2>Sipariş özeti</h2>

            {basket.map((product) => (
                <div key={product.id} className='flex-row' style={{ justifyContent: 'space-between' }}>
                    <img src={product.images?.[0] || product.thumbnail} width={50} height={50} alt={product.title} />
                    <p style={{ flex: 1, margin: '0 15px' }} >{product.title} x {product.count}</p>
                    <p style={{ fontWeight: 'bold' }}>{(product.price) * (product.count).toFixed(2)}$</p>
                </div>

            ))}
            <h3 style={{ textAlign: 'right' }} >Toplam tutar : {totalPrice.toFixed(2)}$</h3>

        </div>
    )
}

export default Checkout