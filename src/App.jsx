import RouterConfig from './config/RouterConfig'
import PageContainer from './components/PageContainer'
import Header from './components/Header'
import './App.css'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { changeDrawer, decreaseCount, deleteProductFromBasket, increaseCount, selectTotalPrice } from './redux/basketSlice'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const { drawer, basket } = useSelector(store => store.basket);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const totalPrice = useSelector(selectTotalPrice);
  console.log(totalPrice);
  const navigate = useNavigate();

  return (
    <>
      <PageContainer>
        <Header />
        <RouterConfig />
      </PageContainer>
      <Drawer anchor='right' open={drawer} onClose={() => dispatch(changeDrawer())}>
        {basket.length === 0 ?
          (<p>Sepetiniz boş</p>)
          :
          basket && basket.map((product) => {
            return (

              <div key={product.id} className='flex-row'>
                <img style={{ padding: '20px' }} src={product.images?.[0] || product.thumbnail} width={50} height={50} alt="" />
                <p style={{ width: '300px' }}>Ürün : {product.title}</p>
                <button disabled={product.count <= 1} onClick={() => dispatch(decreaseCount(product))} >Azalt</button>
                <p>Adet : {product.count}</p>
                <button onClick={() => dispatch(increaseCount(product))} >Arttır</button>
                <p style={{ width: '200px', fontWeight: 'bold', textAlign: 'right' }}  >Fiyat : {product.price}$</p>
                <button onClick={() => {
                  dispatch(deleteProductFromBasket(product));
                  setOpen(true)
                }}
                  style={{ backgroundColor: 'red', color: '#fff' }}>X</button>
              </div>
            )
          })
        }
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'green' }} >Toplam Tutarınız : {totalPrice.toFixed(2)}$</div>
        <div className='flex-row' style={{ padding: '20px' }}>
          <button
            onClick={() => {
              dispatch(changeDrawer());
              navigate('/checkout');
            }}
          >
            Sepeti onayla
          </button>
        </div>
      </Drawer >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert variant='filled' onClose={() => setOpen(false)} severity="error">
          Ürün sepetten silindi
        </Alert>
      </Snackbar>

    </>

  )
}

export default App
