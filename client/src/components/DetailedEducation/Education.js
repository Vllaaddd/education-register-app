import css from "./Education.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"

export default function Education({data}){

    const [employeesWithCompletedEducation, setEmployeesWithCompletedEducation] = useState([])
    const [employeesWithUncompletedEducation, setEmployeesWithUncompletedEducation] = useState([])
    const { t } = useTranslation()

    const { title, date, materials, instructor, startTime, endTime } = data

    const employeesIdsWithCompletedEducation = data.employees.filter(employee => employee.isCompleted === true)
    const employeesIdsWithUncompletedEducation = data.employees.filter(employee => employee.isCompleted === false)

    useEffect(() => {
      if (Array.isArray(employeesIdsWithCompletedEducation) && employeesWithCompletedEducation.length !== employeesIdsWithCompletedEducation.length) {
          const requests = employeesIdsWithCompletedEducation.map(employee => {
              try {
                  return axios.get(`http://localhost:5000/employees/${employee.employee}`);
              } catch (error) {
                  console.log('Помилка при отриманні даних про працівника');
                  return null;
              }
          });
  
          Promise.all(requests)
              .then(responses => {
                  const employeesData = responses.filter(response => response !== null && response.status === 200).map(response => response.data);
                  setEmployeesWithCompletedEducation(employeesData);
              })
              .catch(error => {
                  console.log('Помилка при отриманні даних про працівників');
              });
      }
  }, [employeesIdsWithCompletedEducation, employeesWithCompletedEducation]);
  
  useEffect(() => {
      if (Array.isArray(employeesIdsWithUncompletedEducation) && employeesWithUncompletedEducation.length !== employeesIdsWithUncompletedEducation.length) {
          const requests = employeesIdsWithUncompletedEducation.map(employee => {
              try {
                  return axios.get(`http://localhost:5000/employees/${employee.employee}`);
              } catch (error) {
                  console.log('Помилка при отриманні даних про працівника');
                  return null;
              }
          });
  
          Promise.all(requests)
              .then(responses => {
                  const employeesData = responses.filter(response => response !== null && response.status === 200).map(response => response.data);
                  setEmployeesWithUncompletedEducation(employeesData);
              })
              .catch(error => {
                  console.log('Помилка при отриманні даних про працівників');
              });
      }
  }, [employeesIdsWithUncompletedEducation, employeesWithUncompletedEducation]);

    const generateWordDocument = async () => {
        try {
            const dataToSend = {
              title: title,
              instructor: instructor,
              employees: employeesWithCompletedEducation,
              date: date,
            };
    
            const response = await fetch('http://localhost:5000/createDocument', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToSend)
            })

            if (response.ok) {
              const blob = await response.blob();
        
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'document.docx';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            } else {
              console.error('Failed to generate the document');
            }
          } catch (error) {
            console.error(error);
          }
    }

    return(
        <div className={css.wrapper}>
            <p>{t("educationTitle")}: {title}</p>
            <p>{t("instructor")}: {instructor}</p>
            <p>{t("date")}: {date}</p>
            {materials && (
              <div className={css.materials}>
                <p>{t("additionalMaterials")}: </p>
                <div>{materials}</div>
              </div>
            )}
            <p>{t("start")}: {startTime}</p>
            <p>{t("end")}: {endTime}</p>
            {employeesWithCompletedEducation.length === 0 && employeesIdsWithUncompletedEducation.length === 0 && (
                <p>{t("employeesDidntComplete")}</p>
            )}
            {employeesWithUncompletedEducation.length !== 0 && (
                <ul className={css.list}>{t("employeesCompliting")}:
                    <table className={css.table}>
                      <thead>
                        <tr>
                            <th>{t("name")}</th>
                            <th>{t("proffesion")}</th>
                            <th>{t("schedule")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeesWithUncompletedEducation.map(employee => (
                            <tr key={employee._id}>
                              <td>{employee.fullName}</td>
                              <td>{employee.profession}</td>
                              <td>{employee.schedule}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                </ul>
            )}
            {employeesWithCompletedEducation.length !== 0 && (
                <ul className={css.list}>Працівники які пройшли це навчання:
                    <table className={css.table}>
                      <thead>
                        <tr>
                            <th>{t("name")}</th>
                            <th>{t("proffesion")}</th>
                            <th>{t("schedule")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeesWithCompletedEducation.map(employee => (
                            <tr key={employee._id}>
                              <td>{employee.fullName}</td>
                              <td>{employee.profession}</td>
                              <td>{employee.schedule}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                </ul>
            )}
            {employeesWithCompletedEducation.length !== 0 && employeesWithUncompletedEducation.length === 0 && (
              <button className={css.button} type="button" onClick={() => generateWordDocument()}>{t("createDocument")}</button>
            )}
        </div>
    )
}