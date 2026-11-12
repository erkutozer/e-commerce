import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom';
import { loginSchema } from '../validation/authSchema';
import { clearAuthError, loginUser } from '../redux/authSlice';

function Login() {

    const dispatch = useDispatch();
    const location = useLocation();

    const { token, status, error } = useSelector(store => store.auth);
    const from = location.state?.from?.pathname ?? '/';
    console.log(from)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onTouched',
    });

    useEffect(() => {
        return () => { dispatch(clearAuthError()) }
    }, [dispatch])

    if (token) {
        return <Navigate to={from} replace />
    }

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    }

    return (
        <div style={{ maxWidth: '420px', margin: '40px auto', padding: '0 20px' }}>
            <h2>Giriş Yap</h2>

            <form className='checkout-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="email">E-posta</label>
                <input type="email"
                    id='email'
                    autoComplete='email'
                    className={`checkout-input ${errors.email ? 'has-error' : ''}`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email')}
                />
                {errors.email && <p className='field-error'>{errors.email.message}</p>}

                <label htmlFor="password">Şifre</label>
                <input type="password"
                    id='number'
                    autoComplete='current-password'
                    className={`checkout-input ${errors.password ? 'has-error' : ''}`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    {...register('password')}
                />
                {errors.password && <p className='field-error'>{errors.password.message}</p>}

                {error && <p className='field-error'>{error}</p>}

                <button type='submit' disabled={status === "loading"}>
                    {status === "loading" ? "Giriş yapılıyor..." : "Giriş yap"}
                </button>
            </form>

            <p style={{ marginTop: '20px' }}>
                Hesabın yok mu? <Link to='/register'>Kayıt ol</Link>
            </p>
        </div>
    )
}

export default Login