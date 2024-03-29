import css from "./Center.module.css"

export default function Center({children}){
    return (
        <div className={css.center}>{children}</div>
    )
}