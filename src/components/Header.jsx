import { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import { CiShoppingBasket } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Header.css'
import { FiMoon } from "react-icons/fi";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { changeDrawer } from '../redux/basketSlice';
import { setSearch } from '../redux/productSlice';
import { logout } from '../redux/authSlice';

function Header() {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basket } = useSelector(store => store.basket)
    const { searchTerm } = useSelector(store => store.products);
    const { user } = useSelector(store => store.auth);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme])

    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value))
        if (location.pathname !== '/') {
            navigate('/');
        }
    }

    const changeTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row'>
                <img className='logo' onClick={() => navigate('/')} src="./src/images/logo.png" alt="" />
                <p className='logo-text' >Erkut A.Ş.</p>
            </div>


            <div className='flex-row'>
                <input className='search-input' type="text" placeholder='Bir şeyler aratın' value={searchTerm} onChange={handleSearch} />
                <div>
                    {theme === 'light'
                        ? <FiMoon className='icon' onClick={changeTheme} />
                        : <CiLight className='icon' onClick={changeTheme} />}
                    <Badge onClick={() => dispatch(changeDrawer())} badgeContent={basket.length} color='warning' >
                        <CiShoppingBasket className='icon' />
                    </Badge>
                </div>

                {user ? (
                    <div className='flex-row' style={{ gap: '10px', marginLeft: '15px' }}>
                        <span>Merhaba, {user.fullName.split('')[0]}</span>
                        <button onClick={handleLogout} >Çıkış</button>
                    </div>
                ) : (
                    <div className='flex-row' style={{ gap: '10px', marginLeft: '15px' }}>
                        <button onClick={() => navigate('/login')} >Giriş yap</button>
                        <button onClick={() => navigate('/register')} >Kayıt ol</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header