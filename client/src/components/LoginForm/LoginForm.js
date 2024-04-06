import { login } from "../../redux/auth/operations"
import css from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function LoginForm(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFormSubmit = (ev) => {
        ev.preventDefault()

        const form = ev.currentTarget
        dispatch(login({
            email: form.elements.email.value,
            password: form.elements.password.value,
        }))
        form.reset()
        navigate('/')

    }

    return(
        <>
            <div className={css.wrapper}>
                <form className={css.form} onSubmit={handleFormSubmit}>
                    <h2 className={css.title}>Вхід</h2>
                    
                    <label className={css.label}>Email
                        <input name="email" className={css.input} required={true} type="email" />
                    </label>
                    <label className={css.label}>Password
                        <input name="password" className={css.input} required={true} type="password" />
                    </label>
                    
                    <button className={css.button} type="submit">Увійти</button>
                </form>
            </div>
        </>
    )
}