import { addEducation } from "../../redux/educations/operations"
import css from "./EducationForm.module.css"
import { useDispatch } from "react-redux"
import { useState } from "react";
import FilterInput from "../FilterInput/FilterInput"
import { useSelector } from "react-redux";
import { selectVisibleEmployees } from "../../redux/employees/selectors";
import { useNavigate } from "react-router-dom"

export default function EducationForm(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const employees = useSelector(selectVisibleEmployees)

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleEmployeeSelect = (employeeId) => {
        setSelectedEmployees(prevSelectedEmployees => {
            if (prevSelectedEmployees.includes(employeeId)) {
                return prevSelectedEmployees.filter(id => id !== employeeId);
            } else {
                return [...prevSelectedEmployees, employeeId];
            }
        });
    };

    const handleFormSubmit = ev => {
        ev.preventDefault()
        if(selectedEmployees.length === 0) return
        const form = ev.currentTarget
        dispatch(addEducation({
            title: form.elements.title.value,
            instructor: form.elements.instructor.value,
            date: form.elements.date.value,
            materials: form.elements.materials.value,
            startTime: form.elements.startTime.value,
            endTime: form.elements.endTime.value,
            employees: selectedEmployees,
        }))
        form.reset()
        window.location.reload();
        navigate('/educations')
    }

    return(
        <>
            <div align="center">
                <form className={css.form} onSubmit={handleFormSubmit}>
                    <h2 className={css.title}>Додати навчання</h2>
                    <div>
                        <label className={css.label}>Назва
                            <input required={true} className={css.input} name="title" />
                        </label>
                        <label className={css.label}>Хто проводить
                            <input required={true} className={css.input} name="instructor" />
                        </label>
                        <label className={css.label}>Дата
                            <input required={true} className={css.input} name="date" />
                        </label>
                        <label className={css.label}>Додаткові матеріали
                            <textarea className={css.textarea} name="materials" />
                        </label>
                        <label className={css.label}>Початок
                            <input required={true} className={css.input} name="startTime" />
                        </label>
                        <label className={css.label}>Кінець
                            <input required={true} className={css.input} name="endTime" />
                        </label>
                        <div>
                            <button className={`${css.button} ${isOpen ? css.isOpen : ""}`} onClick={handleButtonClick} type="button">
                                <span>
                                    Вибрати працівників
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <div className={`${css.content} ${isOpen ? css.isOpen : ""}`}>
                                <button type="button" onClick={handleButtonClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className={css.searchWrapper}>
                                    <FilterInput />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </div>
                                <ul className={css.employeesList}>
                                    {employees && employees.map(employee => (
                                        <li className={css} key={employee._id} onClick={() => handleEmployeeSelect(employee._id)}>
                                            {selectedEmployees.includes(employee._id) ? (
                                                <svg
                                                    key={employee._id}
                                                    width="20px"
                                                    height="20px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                        fill="#080341"
                                                    />
                                                    <circle cx="12" cy="12" r="5.25" fill="#080341" />
                                                </svg>
                                            ) : (
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                            {employee.fullName}
                                        </li>
                                    ))}
                                </ul>
                                <button type="button" className={css.chooseButton} onClick={handleButtonClick}>Вибрати</button>
                            </div>
                        </div>
                        <button className={css.chooseButton} type="submit">Додати</button>
                    </div>
                </form>
            </div>
        </>
    )
}