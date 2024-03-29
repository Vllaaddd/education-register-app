import SyncLoader from "react-spinners/SyncLoader";
import css from "./Spinner.module.css"

export default function Spinner(){
    return(
        <div className={css.wrapper}>
            <SyncLoader speedMultiplier={1} color={'#555'}/>
        </div>
       
    )
}