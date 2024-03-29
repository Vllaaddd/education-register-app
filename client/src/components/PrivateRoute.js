import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAdmin } from "../redux/auth/selectors";

export default function PrivateRoute({ component: Component, redirectTo }){

    const isAdmin = useSelector(selectIsAdmin)

    return isAdmin ? <Component /> : <Navigate to={redirectTo} />
}