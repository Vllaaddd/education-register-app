import css from "./Education.module.css"
import { Link } from "react-router-dom"

export default function Education({_id, name, date, startTime, endTime, employees, instructor}){
    return(
        <>
            <div className={css.wrapper}>
                <p>{name}</p>
                <p>{date}</p>
                <p>{startTime}</p>
                <p>{endTime}</p>
                <p>Проводив навчання: {instructor}</p>
                <p>Пройшло {employees.length} працівників</p>
                <hr className={css.line} />
                <Link className={css.link} to={`/educations/${_id}`}>
                    <span>Переглянути більше</span>
                </Link>
            </div>
        </>
        
    )
}