import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { clearAuthError, registerUser } from '../redux/authSlice'
import { registerSchema } from '../validation/authSchema'
import '../css/Checkout.css'

function Register() {
    const dispatch = useDispatch()
    const { token, status, error } = useSelector(store => store.auth)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
        mode: 'onTouched',
    })

    useEffect(() => {
        return () => { dispatch(clearAuthError()) }
    }, [dispatch])

    if (token) {
        return <Navigate to='/' replace />
    }

    const onSubmit = (data) => {
        dispatch(registerUser({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        }))
    }

    return (
        <div style={{ maxWidth: '420px', margin: '40px auto', padding: '0 20px' }}>
            <h2>Kayıt Ol</h2>

            <form className='checkout-form' onSubmit={handleSubmit(onSubmit)} noValidate>

                <label htmlFor='fullName'>Ad Soyad</label>
                <input
                    id='fullName'
                    type='text'
                    autoComplete='name'
                    className={`checkout-input ${errors.fullName ? 'has-error' : ''}`}
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    {...register('fullName')}
                />
                {errors.fullName && <p className='field-error'>{errors.fullName.message}</p>}

                <label htmlFor='email'>E-posta</label>
                <input
                    id='email'
                    type='email'
                    autoComplete='email'
                    className={`checkout-input ${errors.email ? 'has-error' : ''}`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email')}
                />
                {errors.email && <p className='field-error'>{errors.email.message}</p>}

                <label htmlFor='password'>Şifre</label>
                <input
                    id='password'
                    type='password'
                    autoComplete='new-password'
                    className={`checkout-input ${errors.password ? 'has-error' : ''}`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    {...register('password')}
                />
                {errors.password && <p className='field-error'>{errors.password.message}</p>}

                <label htmlFor='confirmPassword'>Şifre Tekrarı</label>
                <input
                    id='confirmPassword'
                    type='password'
                    autoComplete='new-password'
                    className={`checkout-input ${errors.confirmPassword ? 'has-error' : ''}`}
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className='field-error'>{errors.confirmPassword.message}</p>}

                {error && <p className='field-error'>{error}</p>}

                <button type='submit' disabled={status === 'loading'} style={{ marginTop: '20px', padding: '12px' }}>
                    {status === 'loading' ? 'Kayıt yapılıyor...' : 'Kayıt ol'}
                </button>
            </form>

            <p style={{ marginTop: '20px' }}>
                Zaten hesabın var mı? <Link to='/login'>Giriş yap</Link>
            </p>
        </div>
    )
}

export default Register