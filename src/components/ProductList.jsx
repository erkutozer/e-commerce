import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, setPage } from '../redux/productSlice';
import Product from './Product';
import useDebounce from '../hooks/useDebounce';
import Pagination from '@mui/material/Pagination';

function ProductList() {

    const { products, searchTerm, status, error, page, totalPages } = useSelector(store => store.products);
    const dispatch = useDispatch();
    const debouncedSearch = useDebounce(searchTerm.trim(), 400);

    useEffect(() => {
        const request = dispatch(getAllProducts({ search: debouncedSearch, page }));
        return () => request.abort();
    }, [debouncedSearch, page, dispatch])

    if (status === "loading") {
        return <p>Ürünler yükleniyor...</p>
    }
    if (status === "failed") {
        return <p role='alert'>{error}</p>
    }


    return (
        <>
            <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product product={product} key={product.id} />
                    ))
                ) : (
                    <p>Aradığınız ürün bulunmamaktadır.</p>
                )}

            </div>

            {totalPages > 1} && (
            <div className='flex-row' style={{ margin: '30px 0' }}>
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={(_, value) => dispatch(setPage(value - 1))}
                />
            </div>
            )
        </>
    )
}

export default ProductList