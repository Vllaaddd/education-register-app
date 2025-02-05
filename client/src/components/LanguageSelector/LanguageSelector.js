import { useTranslation } from 'react-i18next'
import css from './LanguageSelector.module.css'
import { useDispatch } from 'react-redux'
import { languageUpdate } from '../../redux/language/slice'
import { useEffect, useState } from 'react'

export default function LanguageSelector(){

    const { i18n } = useTranslation()
    const dispatch = useDispatch()
    const [lng, setLng] = useState(i18n.language || "en")

    useEffect(() => {
        dispatch(languageUpdate({
            language: lng
        }));
    }, [lng, dispatch]);

    const languages = [
        { code: "en", lang: "English"},
        { code: "uk", lang: "Ukrainian"},
        { code: "ge", lang: "German"},
    ]

    const changeLanguage = (ev) => {
        const selectedCode = ev.target.value;        
        setLng(selectedCode)
        i18n.changeLanguage(selectedCode)
    }

    return(
        <select className={css.container} onChange={(ev) => changeLanguage(ev)} value={lng}>
            {languages.map(lng => (
                <option value={lng.code} key={lng.code}>{lng.lang}</option>
            ))}
        </select>
    )
}