import css from './Header.module.css'
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin, selectIsLoggedIn } from "../../redux/auth/selectors"
import { logout } from '../../redux/auth/operations';
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export default function Header(){
    
    const { pathname } = useLocation()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const isAdmin = useSelector(selectIsAdmin)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleButtonClick = (ev) => {
        dispatch(logout())
    }

    return(
        <div className={css.header}>
            <h2 className={css.title}>Ajax</h2>
            <div className={css.linksWrapper}>
                <Link to="/" className={pathname === '/' ? css.activeLink : css.link}>{t("mainPage")}</Link>
                <Link to="/employees" className={pathname.includes('/employees') ? css.activeLink : css.link}>{t('allEmployees')}</Link>
                {isAdmin && (
                    <>
                        <Link to="/importEmployees" className={pathname.includes('/importEmployees') ? css.activeLink : css.link}>{t("importEmployees")}</Link>
                        <Link to="/addEducation" className={pathname.includes('/addEducation') ? css.activeLink : css.link}>{t("addEducation")}</Link>
                    </>
                )}
                <Link to="/educations" className={pathname.includes('/educations') ? css.activeLink : css.link}>{t("allEducations")}</Link>
            </div>
            
            <LanguageSelector />

            <div className={css.profileWrapper}>
                {isLoggedIn && (
                    <Link to={'/'} onClick={handleButtonClick} className={pathname.includes('/logout') ? css.activeLink : css.link}>{t("logOut")}</Link>
                )}
                {!isLoggedIn && (
                    <Link to={'/login'} className={pathname.includes('/login') ? css.activeLink : css.link}>{t("logIn")}</Link>
                )}
            </div>
        </div>
    )
}