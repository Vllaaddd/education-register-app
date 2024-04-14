import { login } from "../../redux/auth/operations"
import css from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm(){
    const dispatch = useDispatch()

    const notify = () => toast.error("Заповніть всі поля!", {
        autoClose: 3000
    });

    const handleFormSubmit = async  (ev) => {
        ev.preventDefault()

        const form = ev.currentTarget
        if(form.elements.email.value.length !== 0 && form.elements.password.value.length !== 0){
            dispatch(login({
                email: form.elements.email.value,
                password: form.elements.password.value,
            }))
            form.reset()
        }else{
            notify()
        }
    }

    return(
        <>
            <div className={css.wrapper}>
                <form className={css.form} onSubmit={handleFormSubmit}>
                    <h2 className={css.title}>Вхід</h2>
                    
                    <label className={css.label}>Email
                        <input name="email" className={css.input} />
                    </label>
                    <label className={css.label}>Password
                        <input name="password" className={css.input} type="password" />
                    </label>
                    
                    <button className={css.button} type="submit">Увійти</button>
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    )
}