import { Link } from "react-router-dom";
import css from './ErrorPage.module.css'

export default function ErrorPage(){
    return(
        <div className={css.wrapper}>
            <h1>Error. Page not found</h1>
            <Link to={'/'} className={css.returnButton}>Return to home</Link>
        </div>
    )
}