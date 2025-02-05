import { addEducation } from "../../redux/educations/operations"
import css from "./EducationForm.module.css"
import { useDispatch } from "react-redux"
import { useState } from "react";
import FilterInput from "../FilterInput/FilterInput"
import { useSelector } from "react-redux";
import { selectVisibleEmployees } from "../../redux/employees/selectors";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";

export default function EducationForm(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const employees = useSelector(selectVisibleEmployees)
    const { t } = useTranslation()

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

    const isFormValid = (form) => {
        return (
            form.elements.title.value.length !== 0 &&
            form.elements.instructor.value.length !== 0 &&
            form.elements.date.value.length !== 0 &&
            form.elements.startTime.value.length !== 0 &&
            form.elements.endTime.value.length !== 0 &&
            selectedEmployees.length !== 0
        );
    };
    
    const notify = () => toast.error("Заповніть всі поля і виберіть працівників!", {
        autoClose: 3000
    });

    const handleFormSubmit = ev => {
        ev.preventDefault()
        const form = ev.currentTarget
        if(isFormValid(form)){
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
            navigate('/educations')
            Swal.fire({
                icon: "success",
                text: "Ви успішно додали навчання!"
            })
        }else{
            notify()
        }
    }

    return(
        <>
            <div align="center">
                <form className={css.form} onSubmit={handleFormSubmit}>
                    <h2 className={css.title}>{t("addEducation")}</h2>
                    <div>
                        <label className={css.label}>{t("title")}
                            <input className={css.input} name="title" />
                        </label>
                        <label className={css.label}>{t("whoInstruct")}
                            <input className={css.input} name="instructor" />
                        </label>
                        <label className={css.label}>{t("date")}
                            <input className={css.input} name="date" />
                        </label>
                        <label className={css.label}>{t("additionalMaterials")}
                            <textarea className={css.textarea} name="materials" />
                        </label>
                        <label className={css.label}>{t("start")}
                            <input className={css.input} name="startTime" />
                        </label>
                        <label className={css.label}>{t("end")}
                            <input className={css.input} name="endTime" />
                        </label>
                        <div>
                            <button className={`${css.button} ${isOpen ? css.isOpen : ""}`} onClick={handleButtonClick} type="button">
                                <span>
                                    {t("chooseEmployees")}
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
                                <button type="button" className={css.chooseButton} onClick={handleButtonClick}>{t("choose")}</button>
                            </div>
                        </div>
                        <button className={css.chooseButton} type="submit">{t("add")}</button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    )
}