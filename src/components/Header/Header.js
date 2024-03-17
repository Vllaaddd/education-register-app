import css from './Header.module.css'
import { Link, useLocation } from "react-router-dom";

export default function Header(){
    
    const { pathname } = useLocation()

    return(
        <div className={css.header}>
            <h2 className={css.title}>Ajax</h2>
            <div className={css.linksWrapper}>
                <Link to="/" className={pathname === '/' ? css.activeLink : css.link}>Головна</Link>
                <Link to="/employees" className={pathname.includes('/employees') ? css.activeLink : css.link}>Всі працівники</Link>
                <Link to="/importEmployees" className={pathname.includes('/importEmployees') ? css.activeLink : css.link}>Імпортувати працівників</Link>
                <Link to="/addEducation" className={pathname.includes('/addEducation') ? css.activeLink : css.link}>Додати навчання</Link>
                <Link to="/educations" className={pathname.includes('/educations') ? css.activeLink : css.link}>Всі навчання</Link>
            </div>
            
            <div className={css.profileWrapper}>
                {/* {isAuth ? (
                    <Link href="/" onClick={onClick} className={css.link}>Вийти</Link>
                ) : (
                    <Link href='/login' className={pathname.includes('/login') ? css.activeLink : css.link}>Увійти</Link>
                )}     */}
            </div>
        </div>
    )
}