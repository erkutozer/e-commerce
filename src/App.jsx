import RouterConfig from './config/RouterConfig'
import PageContainer from './components/PageContainer'
import Header from './components/Header'
import './App.css'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { changeDrawer, deleteProductFromBasket } from './redux/basketSlice'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function App() {

  const { drawer, basket } = useSelector(store => store.basket);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const totalPrice = basket.reduce((total, product) => total + (product.count) * (product.price), 0);

  return (
    <>
      <PageContainer>
        <Header />
        <RouterConfig />
      </PageContainer>
      <Drawer anchor='right' open={drawer} onClose={() => dispatch(changeDrawer())}>
        {
          basket && basket.map((product) => {
            return (

              <div key={product.id} className='flex-row'>
                <img style={{ padding: '20px' }} src={product.images?.[0] || product.thumbnail} width={50} height={50} alt="" />
                <p style={{ width: '300px' }}>Ürün : {product.title}</p>
                <p>Miktar : {product.count}</p>
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
