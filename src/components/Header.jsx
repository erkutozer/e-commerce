import { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import '../css/Header.css'
import { FiMoon } from "react-icons/fi";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { changeDrawer } from '../redux/basketSlice';
import { setSearch } from '../redux/productSlice';

function Header() {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basket } = useSelector(store => store.basket)
    const { search } = useSelector(store => store.products);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme])

    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value))
    }

    const changeTheme = () => {
        const root = document.getElementById('root');
        if (theme) {
            root.style.backgroundColor = "black";
            root.style.color = "#fff";
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color = "black";
        }
        setTheme(!theme);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row'>
                <img className='logo' onClick={() => navigate('/')} src="./src/images/logo.png" alt="" />
                <p className='logo-text' >Erkut A.Ş.</p>
            </div>


            <div className='flex-row'>
                <input className='search-input' type="text" placeholder='Bir şeyler aratın' value={search} onChange={handleSearch} />
                <div>
                    {theme === 'light'
                        ? <FiMoon className='icon' onClick={changeTheme} />
                        : <CiLight className='icon' onClick={changeTheme} />}
                    <Badge onClick={() => dispatch(changeDrawer())} badgeContent={basket.length} color='warning' >
                        <CiShoppingBasket className='icon' />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header