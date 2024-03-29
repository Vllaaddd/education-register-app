import { Link } from "react-router-dom"
import css from "./Education.module.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Education({data}){

    const [employees, setEmployees] = useState([])

    const { title, date, materials, instructor, startTime, endTime, employees: employeesIds } = data

    useEffect(() => {
        if (Array.isArray(employeesIds)) {
            employeesIds.map(employeeId => {
              try {
                axios.get(`http://localhost:5000/employees/${employeeId.employee}`).then(res => {
                  const employee = res.data;
                  if (employee) {
                    setEmployees((prevEmployees) => [...prevEmployees, employee]);
                  } else {
                    console.log('Немає працівника з таким id');
                  }
                }).catch(err => {
                  console.log('Працівника не знайдено');
                });
              } catch (error) {
                console.log('Працівника не знайдено');
              }
            });
        }
    }, [employeesIds])

    const generateWordDocument = async () => {
        try {
            const dataToSend = {
              title: title,
              instructor: instructor,
              employees: employees,
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
            {employees.length === 0 && (
                <p>Жоден працівник не пройшов це навчання</p>
            )}
            {!employees.length !== 0  && (
                <ul className={css.list}>Працівники які пройшли це навчання: 
                {employees.length > 0 && employees.map((employee, i) => (
                    <Link className={css.listItem} to={`/employees/${employee._id}`} key={i}>{employee.fullName}</Link>
                ))}
                </ul>
            )}
            <button className={css.button} type="button" onClick={() => generateWordDocument()}>Створити документ</button>
        </div>
    )
}