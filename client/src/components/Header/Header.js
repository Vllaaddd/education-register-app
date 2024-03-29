import css from './Header.module.css'
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin, selectIsLoggedIn } from "../../redux/auth/selectors"
import { logout } from '../../redux/auth/operations';

export default function Header(){
    
    const { pathname } = useLocation()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const isAdmin = useSelector(selectIsAdmin)
    const dispatch = useDispatch()

    const handleButtonClick = (ev) => {
        dispatch(logout())
    }

    return(
        <div className={css.header}>
            <h2 className={css.title}>Ajax</h2>
            <div className={css.linksWrapper}>
                <Link to="/" className={pathname === '/' ? css.activeLink : css.link}>Головна</Link>
                <Link to="/employees" className={pathname.includes('/employees') ? css.activeLink : css.link}>Всі працівники</Link>
                {isAdmin && (
                    <>
                        <Link to="/importEmployees" className={pathname.includes('/importEmployees') ? css.activeLink : css.link}>Імпортувати працівників</Link>
                        <Link to="/addEducation" className={pathname.includes('/addEducation') ? css.activeLink : css.link}>Додати навчання</Link>
                    </>
                )}
                <Link to="/educations" className={pathname.includes('/educations') ? css.activeLink : css.link}>Всі навчання</Link>
            </div>
            
            <div className={css.profileWrapper}>
                {isLoggedIn && (
                    <Link to={'/'} onClick={handleButtonClick} className={pathname.includes('/logout') ? css.activeLink : css.link}>Вийти</Link>
                )}
                {!isLoggedIn && (
                    <Link to={'/login'} className={pathname.includes('/login') ? css.activeLink : css.link}>Увійти</Link>
                )}
            </div>
        </div>
    )
}