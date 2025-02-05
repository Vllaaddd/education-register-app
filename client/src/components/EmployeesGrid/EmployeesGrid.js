import { useDispatch, useSelector } from "react-redux"
import css from "./EmployeesGrid.module.css"
import { Link } from "react-router-dom"
import { selectIsAdmin } from "../../redux/auth/selectors"
import { deleteAll, deleteOneEmployee } from "../../redux/employees/operations"
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next"

export default function EmployeesGrid({employees}){

    const isAdmin = useSelector(selectIsAdmin)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleButtonClick = () => {
        Swal.fire({
            title: t("areYouSure"),
            text: t("doYouWantToDeleteEmployees"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#02a815",
            cancelButtonColor: "#d33",
            cancelButtonText: t("cancel"),
            confirmButtonText: t("delete")
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAll())
                Swal.fire({
                    title: t("employeesDeleted"),
                    text: t("youDeletedAllEmployees"),
                    icon: "success"
                });
            }
        });
    }

    const handleDelete = (employeId, employeeName) => {
        Swal.fire({
            title: t("areYouSure"),
            text: `${t("douYouWantTODelete")} ${employeeName} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#02a815",
            cancelButtonColor: "#d33",
            cancelButtonText: t("cancel"),
            confirmButtonText: t("delete")
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOneEmployee(employeId))
                Swal.fire({
                    title: t("employeeDeleted"),
                    text: `${t("youDeleted")} ${employeeName} .`,
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
            <h2 className={css.title}>{t("allEmployees")}</h2>
            {employees && employees.length > 0 && (
                <table className={css.table}>
                    <thead>
                        <tr>
                            <th>{t("name")}</th>
                            <th>{t("profession")}</th>
                            <th>{t("status")}</th>
                            <th>{t("schedule")}</th>
                            <th>{t("educationsAmount")}</th>
                            <th colSpan="3">{t("detailedInformation")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.fullName}</td>
                                <td>{employee.profession}</td>
                                <td>{employee.status}</td>
                                <td>{employee.schedule}</td>
                                <td>{employee.allEducations.length}</td>
                                <td><Link className={css.link} to={`/employees/${employee._id}`}>{t("seeMore")}</Link></td>
                                {isAdmin && (
                                    <td>
                                        <div className={css.wrapper}>
                                            <div className={css.edit}>
                                                <Link className={css.link} to={`/editEmployee/${employee._id}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            <div className={css.delete} onClick={() => handleDelete(employee._id, employee.fullName)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
            </table>
            )}
        </>
    )
}