import css from "./Employee.module.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Employee({data}){

    const [educations, setEducations] = useState([])

    const { fullName, allEducations } = data
    
    useEffect(() => {
        if (Array.isArray(allEducations)) {
          allEducations.map(educationId => {
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
      }, [allEducations]);

    return(
        <div className={css.wrapper}>
            <h2 className={css.title}>{fullName}</h2>
            {educations.length === 0 && (
                <p>Немає пройдених навчань</p>
            )}
            {educations && educations.length > 0 && (
                <>
                    <p>Пройдені навчання: </p>
                    <table className={css.table}>
                        <tr>
                            <th>Назва навчання</th>
                            <th>Хто проводив</th>
                            <th>Дата</th>
                            <th>Початок</th>
                            <th>Кінець</th>
                        </tr>
                        {educations.map(education => (
                            <tr key={education._id}>
                            <td>{education.title}</td>
                            <td>{education.instructor}</td>
                            <td>{education.date}</td>
                            <td>{education.startTime}</td>
                            <td>{education.endTime}</td>
                            </tr>
                        ))}
                </table>
                </>
            )}
        </div>
    )
}