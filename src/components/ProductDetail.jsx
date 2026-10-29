import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { addToBasket } from '../redux/basketSlice';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

function ProductDetail() {
    let { id } = useParams();
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ id: null, product: null, error: null });

    useEffect(() => {
        let ignore = false;
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(res => {
                if (!ignore) setResult({ id, product: res.data, error: null });
            })
            .catch(err => {
                if (!ignore) setResult({ id, product: null, error: err.message });
            });
        return () => { ignore = true }
    }, [id])

    const loading = result.id !== id;
    const { product, error } = result;

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const increment = () => {
        setCount(count + 1);
    }

    const addBasket = () => {
        dispatch(addToBasket({ ...product, count }));
        setOpen(true);
    }

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Ürün yüklenemedi : {error}</p>;

    const { images, price, title, thumbnail, description } = product;
    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{ marginRight: '40px' }}>
                <img width={300} height={500} src={images?.[0] || thumbnail} alt="" />
            </div>
            <div>
                <p style={{ fontFamily: 'arial', fontWeight: 'bold' }}>Ürün : {title}</p>
                <p style={{ fontSize: '15px', fontFamily: 'arial', fontWeight: 'lighter' }}>Açıklama : {description}</p>
                <h3 style={{ fontSize: '30px', fontFamily: 'arial', fontWeight: 'bold', color: 'green' }}>Fiyat : {price}$</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CiSquareMinus onClick={decrement} style={{ fontSize: '25px', marginRight: '7px' }} /> <span style={{ fontSize: '20px' }}>{count}</span>  <CiSquarePlus onClick={increment} style={{ fontSize: '25px', marginLeft: '7px' }} />
                </div>
                <div>
                    <button onClick={addBasket} style={{ marginTop: '25px', border: 'none', padding: '10px', backgroundColor: 'yellowgreen', color: '#fff', borderRadius: '8px' }}>Sepete Ekle</button>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
            >
                <Alert variant='filled' open={open} onClose={() => setOpen(false)} severity="success">
                    Ürün eklendi
                </Alert>
            </Snackbar>
        </div >
    )
}

export default ProductDetail