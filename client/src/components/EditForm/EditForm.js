import { useDispatch } from "react-redux"
import css from "./EditForm.module.css"
import { updateEmployee } from "../../redux/employees/operations"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function EditForm({data}){
    
    const { fullName, profession, schedule, status, isAdmin, _id } = data
    
    const [isAdminValue, setIsAdminValue] = useState(isAdmin);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFormSubmit = (ev) => {
        ev.preventDefault()

        const form = ev.currentTarget
        dispatch(updateEmployee({
            employeeId: _id,
            updateData: {
                fullName: form.elements.fullName.value || fullName,
                profession: form.elements.profession.value || profession,
                schedule: form.elements.schedule.value || schedule,
                status: form.elements.status.value || status,
                isAdmin: isAdminValue
            }
        }))
        form.reset()
        navigate('/')
    }

    const handleIsAdminChange = (ev) => {
        const value = ev.target.value === 'true';
        setIsAdminValue(value);
    }

    return(
        <div className={css.wrapper}>
            <form className={css.form} onSubmit={handleFormSubmit}>
                <h2 className={css.title}>Оновити працівника</h2>
                <label className={css.label}>Ім'я</label>
                <input name="fullName" className={css.input} placeholder={fullName}></input>
                <label className={css.label}>Професія</label>
                <input name="profession" className={css.input} placeholder={profession}></input>
                <label className={css.label}>Графік</label>
                <input name="schedule" className={css.input} placeholder={schedule}></input>
                <label className={css.label}>Статус</label>
                <input name="status" className={css.input} placeholder={status}></input>
                <label className={css.label}>Адмін</label>
                <select name="isAdmin" className={css.select} value={isAdminValue} onChange={handleIsAdminChange}>
                    <option value={true}>Так</option>
                    <option value={false}>Ні</option>
                </select>

                <button className={css.button} type="submit">Оновити</button>
            </form>
        </div>
    )
}