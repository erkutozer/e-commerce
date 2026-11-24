import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function OrderSuccess() {

    const { state } = useLocation();
    const order = state?.order;
    const navigate = useNavigate();

    if (!order) {
        return <Navigate to='/' replace />
    }

    const { orderNumber, items, totalAmount } = order;
    return (
        <div>
            <h2 style={{ color: 'green' }}>Siparişiniz alındı</h2>
            <p>Sipariş Numaranız : <strong>{orderNumber}</strong></p>
            <p>Teşekkürler <strong>{order.fullName}</strong>, Sipariş detayları <strong>{order.email} adresine gönderildi.</strong> :</p>
            <h3 style={{ marginTop: '30px' }}>Teslimat Adresi</h3>
            <p>{order.address}, {order.city}</p>
            <p>Telefon : {order.phone}</p>

            <h3 style={{ marginTop: '30px' }}>Ürünler</h3>
            {
                items.map((product) => (
                    <div key={product.productId} className='flex-row' style={{ justifyContent: 'space-between' }}>
                        <img src={product.thumbnail} width={60} height={60} />
                        <p>{product.title} x {product.quantity}</p>
                        <p>{product.lineTotal}$</p>
                    </div>
                ))
            }
            <h3 style={{ fontWeight: 'bold' }}>Toplam tutar : {totalAmount.toFixed(2)}</h3>
            <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px' }}>Alışverişe devam et</button>
            <button onClick={() => navigate('/orders')} >Siparişlerim</button>
        </div>
    )
}

export default OrderSuccess