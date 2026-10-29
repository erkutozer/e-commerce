import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/productSlice';
import Product from './Product';

function ProductList() {

    const { products, search, status, error } = useSelector(store => store.products);
    const dispatch = useDispatch();


    useEffect(() => {
        if (status === "idle") {
            dispatch(getAllProducts())
        }

    }, [dispatch])

    if (status === "loading") {
        return <p>Ürünler yükleniyor...</p>
    }
    if (status === "failed") {
        return <p role='alert'>{error}</p>
    }

    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.trim().toLowerCase()));

    return (
        <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Product product={product} key={product.id} />
                ))
            ) : (
                <p>Aradığınız ürün bulunmamaktadır.</p>
            )}

        </div>
    )
}

export default ProductList