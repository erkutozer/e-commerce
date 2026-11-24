import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client';
import { formatDate, formatPrice } from '../utils/format';

function OrderDetails() {

    const { orderNumber } = useParams();
    const [result, setResult] = useState({ orderNumber: null, order: null, error: null });

    useEffect(() => {
        let ignore = false;

        api.get(`/orders/my/${encodeURIComponent(orderNumber)}`)
            .then(res => {
                if (!ignore) setResult({ orderNumber, order: res.data, error: null })
            })
            .catch(err => {
                if (!ignore) setResult({ orderNumber, order: null, error: err.response?.data?.message ?? err.message })
            })
        return () => { ignore = true }
    }, [orderNumber])

    const loading = result.orderNumber !== orderNumber;
    const { order, error } = result;

    if (loading) return <p>Sipariş yükleniyor...</p>
    if (error) {
        return (
            <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>
                <p>{error}</p>
                <Link to="/orders" >Siparişlerime dön</Link>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>
            <Link to="/orders">Siparişlerim</Link>

            <h2>Sipariş {order.orderNumber}</h2>
            <p>{formatDate(order.createAt)}</p>

            <h3>Teslimat</h3>
            <p>İsim : {order.fullName}</p>
            <p>Adres : {order.address} / {order.city}</p>
            <p>Telefon - E-posta : {order.phone} - {order.email}</p>

            <h3>Ürünler</h3>
            {
                order.items.map(item => (

                    <div key={item.productId} className='flex-row' style={{ justifyContent: 'space-between' }}>
                        <img src={item.images?.[0] || item.thumbnail} width={100} height={100} />
                        <p>{item.title} x {item.quantity}</p>
                        <p style={{ fontWeight: 'bold' }}>{formatPrice(item.unitPrice)}$</p>
                    </div>
                ))
            }

            <h3 style={{ textAlign: 'right' }}>Toplam : {formatPrice(order.totalAmount)}$</h3>

        </div>
    )
}

export default OrderDetails