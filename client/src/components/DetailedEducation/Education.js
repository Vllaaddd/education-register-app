import css from "./Education.module.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Education({data}){

    const [employeesWithCompletedEducation, setEmployeesWithCompletedEducation] = useState([])
    const [employeesWithUncompletedEducation, setEmployeesWithUncompletedEducation] = useState([])

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
            <p>Назва навчання: {title}</p>
            <p>Проводив навчання: {instructor}</p>
            <p>Дата: {date}</p>
            {materials && (
              <div className={css.materials}>
                <p>Додаткові матеріали: </p>
                <div>{materials}</div>
              </div>
            )}
            <p>Початок: {startTime}</p>
            <p>Кінець: {endTime}</p>
            {employeesWithCompletedEducation.length === 0 && employeesIdsWithUncompletedEducation.length === 0 && (
                <p>Жоден працівник не пройшов це навчання</p>
            )}
            {employeesWithUncompletedEducation.length !== 0 && (
                <ul className={css.list}>Працівники які проходять це навчання:
                    <table className={css.table}>
                      <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th>Професія</th>
                            <th>Графік роботи</th>
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
                            <th>Ім'я</th>
                            <th>Професія</th>
                            <th>Графік роботи</th>
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
              <button className={css.button} type="button" onClick={() => generateWordDocument()}>Створити документ</button>
            )}
        </div>
    )
}