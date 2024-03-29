import { useLoaderData } from "react-router-dom"
import Education from "../components/DetailedEducation/Education"

export default function EducationPage(){

    const data = useLoaderData()

    return(
        <Education data={data} />
    )
}