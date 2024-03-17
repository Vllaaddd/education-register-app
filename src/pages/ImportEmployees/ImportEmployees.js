import { useState } from "react";
import css from './ImportEmployees.module.css'
import { useDispatch } from "react-redux";
import { importEmployees } from "../../redux/employees/operations";

export default function ImportEmployees(){

    const dispatch = useDispatch()

    const [sheetsId, setSheetsId] = useState('')

    const handleFormSubmit = (ev) => {
        ev.preventDefault();

        if(sheetsId.length === 0){
            return alert('Вставте посилання на таблицю')
        }

        const regex = /\/d\/([^/]+)/;
        const match = sheetsId.match(regex);

        if(match == null){
            return alert('Невірний формат посилання')
        }
        
        const documentId = match[1];

        dispatch(importEmployees(documentId))
        setSheetsId('')
        
    }

    return(
        <>
            <div className="center">
                <form onSubmit={handleFormSubmit} className={css.styledForm}>
                    <h2 className={css.title}>Імпортувати працівників</h2>
                    <input className={css.styledInput} placeholder="Посилання на гугл таблицю" value={sheetsId || ''} onChange={ev => setSheetsId(ev.target.value)} required />
                    <button type="submit" className={css.styledButton}>Імпортувати</button>
                </form>
            </div>
        </>
    )
}