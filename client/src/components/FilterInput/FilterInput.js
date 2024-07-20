import { useDispatch } from "react-redux"
import { filterUpdate } from "../../redux/filter/slice"
import css from './FilterInput.module.css'

export default function FilterInput(){

    const dispatch = useDispatch()

    const handleInputChange = (ev) => {
        const name = ev.target.value.toLowerCase()
        dispatch(filterUpdate(name))
    }

    return(
        <input className={css.input} placeholder="Ім'я працівника" onChange={handleInputChange} />
    )
}