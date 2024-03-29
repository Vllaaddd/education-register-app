import Center from "../components/Center/Center"
import EducationsGrid from "../components/EducationsGrid/EducationsGrid"
import { useSelector } from "react-redux";
import { selectEducations } from "../redux/educations/selectors";

export default function Educations(){

    const educations = useSelector(selectEducations)

    return(
        <>
            <Center>
                {educations.length === 0 && (
                    <h2 align="center">Немає навчань</h2>
                )}
                {educations.length !== 0 && (
                    <EducationsGrid educations={educations} />
                )}
            </Center>
        </>
    )
}