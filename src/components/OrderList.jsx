import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/client';
import { formatDate, formatPrice } from '../utils/format'
import Pagination from '@mui/material/Pagination'


function OrderList() {

    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [result, setResult] = useState({ page: null, data: null, error: null });

    useEffect(() => {
        let ignore = false;

        api.get("/orders/my", { params: { page, size: 10 } })
            .then(res => {
                if (!ignore) setResult({ page, data: res.data, error: null });
            })
            .catch(err => {
                if (!ignore) setResult({ page, data: null, error: err.response?.data?.message ?? err.message });
            })
        return () => { ignore = true }
    }, [page])


    const loading = result.page !== page;

    const { data, error } = result;
    console.log(data);

    if (loading) return <p>Siparişler yükleniyor...</p>
    if (error) return <p>Siparişler yüklenemedi. Hata : {error}</p>

    if (data.content.length === 0) {
        return (
            <div className='flex-column' style={{ marginTop: '50px' }}>
                <p>Henüz siparişin yok.</p>
                <button onClick={() => navigate("/")}>Alışverişe başla</button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>
            <h2>Siparişlerim</h2>
            {
                data.content.map(order => (
                    <div
                        key={order.orderNumber}
                        className='flex-row'
                        style={{ justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}
                    >
                        <div>
                            <Link to={`/orders/${order.orderNumber}`}><strong>{order.orderNumber}</strong></Link>
                            <p style={{ margin: 0, fontSize: '14px' }} >{formatDate(order.createAt)}</p>
                        </div>
                        <strong>{formatPrice(order.totalAmount)}</strong>
                    </div>
                ))}

            {
                data.totalPages > 1 && (
                    <div className='flex-row' style={{ margin: '30px 0' }}>
                        <Pagination
                            count={data.totalPages}
                            page={page + 1}
                            onChange={(_, value) => setPage(value - 1)}
                        />
                    </div>
                )
            }

        </div>
    )
}

export default OrderList