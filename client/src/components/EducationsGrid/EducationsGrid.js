import Education from "../Education/Education"
import css from "./EducationsGrid.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAdmin } from "../../redux/auth/selectors"
import { deleteAll } from "../../redux/educations/operations"
import { clearAllEducations } from "../../redux/employees/operations"
import Swal from 'sweetalert2'

export default function EducationsGrid({educations}){

    const isAdmin = useSelector(selectIsAdmin)
    const dispatch = useDispatch()

    const handleButtonClick = () => {
        Swal.fire({
            title: "Ви впевнені?",
            text: "Ви точно хочете видалити навчання?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#02a815",
            cancelButtonColor: "#d33",
            cancelButtonText: "Скасувати",
            confirmButtonText: "Так, видалити!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAll())
                dispatch(clearAllEducations())
                Swal.fire({
                    title: "Навчання видалені!",
                    text: "Ви видалили всі навчання.",
                    icon: "success"
                });
            }
          });
    }

    return(
        <>
            {isAdmin && (
                <button className={css.deleteButton} onClick={handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            )}
            <h2 className={css.title}>Всі навчання</h2>
            <div className={css.wrapper}>
                {educations.length > 0 && educations.map((education, i) => (
                    <Education key={i} {...education} />
                ))}
            </div>
        </>
    )
}