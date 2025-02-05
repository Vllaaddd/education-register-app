import Center from "../components/Center/Center"
import EducationsGrid from "../components/EducationsGrid/EducationsGrid"
import { useSelector } from "react-redux";
import { selectEducations } from "../redux/educations/selectors";
import { useTranslation } from "react-i18next";

export default function Educations(){

    const educations = useSelector(selectEducations)
    const { t } = useTranslation()

    return(
        <>
            <Center>
                {educations.length === 0 && (
                    <h2 align="center">{t("noEducations")}</h2>
                )}
                {educations.length !== 0 && (
                    <EducationsGrid educations={educations} />
                )}
            </Center>
        </>
    )
}