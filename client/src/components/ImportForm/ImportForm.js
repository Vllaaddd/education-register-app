import css from "./ImportForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { importEmployees } from "../../redux/employees/operations";
import { useTranslation } from "react-i18next";

export default function ImportForm(){

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [sheetsId, setSheetsId] = useState('')

    const handleFormSubmit = (ev) => {
        ev.preventDefault();

        if(sheetsId.length === 0){
            return alert(t("pasteTableLink"))
        }

        const regex = /\/d\/([^/]+)/;
        const match = sheetsId.match(regex);

        if(match == null){
            return alert(t("wrongLinkFormat"))
        }
        
        const documentId = match[1];

        dispatch(importEmployees(documentId))
        setSheetsId('')
    }

    return(
        <div className="center">
            <form onSubmit={handleFormSubmit} className={css.form}>
                <h2 className={css.title}>{t("importEmployees")}</h2>
                <input className={css.input} placeholder={t("googlesheetsLink")} value={sheetsId || ''} onChange={ev => setSheetsId(ev.target.value)} required />
                <button type="submit" className={css.button}>{t("import")}</button>
            </form>
        </div>
    )
}