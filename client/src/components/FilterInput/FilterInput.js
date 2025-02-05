import { useDispatch } from "react-redux"
import { filterUpdate } from "../../redux/filter/slice"
import css from './FilterInput.module.css'
import { useTranslation } from "react-i18next"

export default function FilterInput(){

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleInputChange = (ev) => {
        const name = ev.target.value.toLowerCase()
        dispatch(filterUpdate(name))
    }

    return(
        <input className={css.input} placeholder={t("employeeName")} onChange={handleInputChange} />
    )
}