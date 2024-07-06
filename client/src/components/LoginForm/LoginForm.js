import { login } from "../../redux/auth/operations"
import css from "./LoginForm.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { selectError } from "../../redux/auth/selectors"
import { useEffect } from "react";

export default function LoginForm(){
    const dispatch = useDispatch()
    const error = useSelector(selectError)

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

    const errorNotify = () => toast.error('Неправильний пароль або email!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    useEffect(() => {
        if(error !== null){
            errorNotify()
        }
    }, [error])

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
                    <GoogleLogin 
                        onSuccess={res => {
                            const data = jwtDecode(res.credential)
                            dispatch(login({
                                email: data.email,
                            })) 
                        }}
                    />
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    )
}