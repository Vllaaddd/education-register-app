import css from "./FilterContainer.module.css"

export default function FilterContainer({children}){
    return (
        <div className={css.center}>{children}</div>
    )
}