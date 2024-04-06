import css from "./Education.module.css"
import { Link } from "react-router-dom"

export default function Education({_id, title, date, startTime, endTime, employees, instructor}){
    return(
        <>
            <div className={css.wrapper}>
                <p>Назва: {title}</p>
                <p>Дата: {date}</p>
                <p>Початок: {startTime}</p>
                <p>Кінець: {endTime}</p>
                <p>Проводив навчання: {instructor}</p>
                <hr className={css.line} />
                <Link className={css.link} to={`/educations/${_id}`}>
                    <span>Переглянути більше</span>
                </Link>
            </div>
        </>
        
    )
}