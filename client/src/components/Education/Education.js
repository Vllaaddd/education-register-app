import { useTranslation } from "react-i18next"
import css from "./Education.module.css"
import { Link } from "react-router-dom"

export default function Education({_id, title, date, startTime, endTime, employees, instructor}){

    const { t } = useTranslation()

    return(
        <>
            <div className={css.wrapper}>
                <p>{t("title")}: {title}</p>
                <p>{t("date")}: {date}</p>
                <p>{t("start")}: {startTime}</p>
                <p>{t("end")}: {endTime}</p>
                <p>{t("instructor")}: {instructor}</p>
                <hr className={css.line} />
                <Link className={css.link} to={`/educations/${_id}`}>
                    <span>{t("seeMore")}</span>
                </Link>
            </div>
        </>
        
    )
}