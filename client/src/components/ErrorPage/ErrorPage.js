import { Link } from "react-router-dom";
import css from './ErrorPage.module.css'
import { useTranslation } from "react-i18next";

export default function ErrorPage(){

    const { t } = useTranslation()

    return(
        <div className={css.wrapper}>
            <h1>{t("pageNotFound")}</h1>
            <Link to={'/'} className={css.returnButton}>{t("returnHome")}</Link>
        </div>
    )
}