import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalPrice } from '../redux/basketSlice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import { checkoutSchema } from '../validation/checkoutSchema';
import { useForm } from 'react-hook-form';
import '../css/Checkout.css'

function Checkout() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(checkoutSchema),
        mode: 'onTouched'
    })

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

    const onSubmit = (data) => {
        console.log('Sipariş bilgileri : ', data);
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

            <h2 style={{ marginTop: '40px' }} >Teslimat Bilgileri</h2>

            <form className='checkout-form' onSubmit={handleSubmit(onSubmit)} noValidate>

                <label htmlFor="fullName">Ad Soyad</label>
                <input
                    id='fullName'
                    type="text"
                    className={`checkout-input ${errors.fullname ? 'has-error' : ''}`}
                    aria-invalid={errors.fullname ? 'true' : 'false'}
                    {...register('fullname')}
                />
                {errors.fullname && <p className='field-error'>{errors.fullname.message}</p>}

                <label htmlFor="email">E-posta</label>
                <input type="email"
                    id='email'
                    className={`checkout-input ${errors.city ? 'has-error' : ''}`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email')}
                />
                {errors.email && <p className='field-error'>{errors.email.message}</p>}

                <label htmlFor="phone">Telefon</label>
                <input type="tel"
                    id='phone'
                    className={`checkout-input ${errors.city ? 'has-error' : ''}`}
                    {...register('phone')}
                />
                {errors.phone && <p className='field-error'>{errors.phone.message}</p>}

                <label htmlFor="city">Şehir</label>
                <input
                    id='city'
                    className={`checkout-input ${errors.city ? 'has-error' : ''}`}
                    aria-invalid={errors.city ? 'true' : 'false'}
                    {...register('city')}
                />
                {errors.city && <p className='field-error'>{errors.city.message}</p>}

                <label htmlFor="address">Adres Bilgisi</label>
                <input type="text"
                    id='address'
                    className={`checkout-input ${errors.city ? 'has-error' : ''}`}
                    {...register('address')}
                />
                {errors.address && <p className='field-error'>{errors.address.message}</p>}

                <button type='submit' style={{ marginTop: '20px', padding: '12px' }} >Siparişi onayla</button>

            </form>

        </div>
    )
}

export default Checkout