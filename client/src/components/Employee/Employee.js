import css from "./Employee.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"

export default function Employee({data}){

    const [educations, setEducations] = useState([])
    const [completedEducations, setCompletedEducations] = useState([])
    const [unCompletedEducations, setUnCompletedEducations] = useState([])
    const { t } = useTranslation()

    const { fullName, allEducations, _id } = data

    useEffect(() => {
      if (Array.isArray(allEducations)) {
        Promise.all(
          allEducations.map((educationId) =>
            axios
              .get(`http://localhost:5000/education/${educationId}`)
              .then((res) => res.data)
              .catch((err) => {
                console.log("Навчання не знайдено");
                return null;
              })
          )
        ).then((educations) => {
          const filteredEducations = educations.filter(
            (education) => education !== null
          );
          setEducations(filteredEducations);
          const completed = [];
          const uncompleted = [];
          filteredEducations.forEach((education) => {
            const isCompleted = education.employees.some(
              (employee) => employee.employee === _id && employee.isCompleted === true
            );
            if (isCompleted) {
              completed.push(education);
            } else {
              uncompleted.push(education);
            }
          });
          setCompletedEducations(completed);
          setUnCompletedEducations(uncompleted);
        });
      }
    }, [allEducations, _id]);

    return(
        <div className={css.wrapper}>
            <h2 className={css.title}>{fullName}</h2>
            {educations.length === 0 && (
                <p>{t("noEducations")}</p>
            )}
            {unCompletedEducations && unCompletedEducations.length !== 0 && (
                <>
                    <p>{t("activeEducations")}: </p>
                    <table className={css.table}>
                      <thead>
                        <tr>
                          <th>{t("educationTitle")}</th>
                          <th>{t("whoInstruct")}</th>
                          <th>{t("date")}</th>
                          <th>{t("start")}</th>
                          <th>{t("end")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unCompletedEducations.map(education => (
                            <tr key={education._id}>
                              <td>{education.title}</td>
                              <td>{education.instructor}</td>
                              <td>{education.date}</td>
                              <td>{education.startTime}</td>
                              <td>{education.endTime}</td>
                            </tr>
                        ))}
                      </tbody>
                </table>
                </>
            )}
            {completedEducations && completedEducations.length !== 0 && (
                <>
                    <p>{t("completedEducations")}: </p>
                    <table className={css.table}>
                      <thead>
                        <tr>
                          <th>{t("educationTitle")}</th>
                          <th>{t("whoInstruct")}</th>
                          <th>{t("date")}</th>
                          <th>{t("start")}</th>
                          <th>{t("end")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedEducations.map(education => (
                            <tr key={education._id}>
                              <td>{education.title}</td>
                              <td>{education.instructor}</td>
                              <td>{education.date}</td>
                              <td>{education.startTime}</td>
                              <td>{education.endTime}</td>
                            </tr>
                        ))}
                      </tbody>
                </table>
                </>
            )}
        </div>
    )
}