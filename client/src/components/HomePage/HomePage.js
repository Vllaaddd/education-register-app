import css from "./HomePage.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAdmin, selectIsLoggedIn, selectUser } from "../../redux/auth/selectors"
import { useEffect, useState } from "react"
import axios from "axios"
import { changeIsCompleted } from "../../redux/educations/operations"
import { useTranslation } from "react-i18next"

export default function HomePage(){

    const [educations, setEducations] = useState([])
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const isAdmin = useSelector(selectIsAdmin)
    const user = useSelector(selectUser)

    const educationIds = user?.allEducations
    
    useEffect(() => {
        if (Array.isArray(educationIds)) {
          educationIds.map(educationId => {
            try {
              axios.get(`http://localhost:5000/education/${educationId}`).then(res => {
                const education = res.data;
                if (education) {
                  setEducations((prevEducations) => [...prevEducations, education]);
                } else {
                  console.log('Немає навчання з таким id');
                }
              }).catch(err => {
                console.log('Навчання не знайдено');
              });
            } catch (error) {
              console.log('Навчання не знайдено');
            }
          });
        }
    }, [educationIds]);

    const handleButtonClick = (educationId) => {
      dispatch(changeIsCompleted({
        educationId,
        employeeId: user._id,
        isCompleted: true,
      }))
      window.location.reload()
    }

    return(
        <>
            {!isLoggedIn && (
              <h2 className={css.title}>{t("educationRegister")}</h2>
            )}
            {isLoggedIn && !isAdmin && (
                <>
                    <h2 className={css.title}>{t("myEducations")}</h2>
                    <ul className={css.list}>
                        {educations && educations.length !== 0 && educations.map(education => {
                          const employee = education.employees.filter(employee => {
                            return (employee.employee === user._id && employee.isCompleted === true);
                          })
                          if (employee.length === 0) {
                            return (
                              <li key={education._id}>
                                <p>{t("title")}: {education.title}</p>
                                <p>{t("whoInstruct")}: {education.instructor}</p>
                                <p>{t("date")}: {education.date}</p>
                                <p>{t("start")}: {education.startTime}</p>
                                <p>{t("end")}: {education.endTime}</p>
                                {education.materials && (
                                    <p>{t("additionalMaterials")}: {education.materials}</p>
                                )}
                                <button onClick={() => handleButtonClick(education._id)} className={css.button} type="button">{t("checkAsCompleted")}</button>
                              </li>
                            )
                          }
                        })}
                    </ul>
                </>
            )}
        </>
    )
}