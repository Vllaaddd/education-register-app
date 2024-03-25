import { useSelector } from "react-redux";
import { selectEmployees } from "../redux/employees/selectors";
import EmployeesGrid from "../components/EmployeesGrid/EmployeesGrid";

export default function Employees(){

    const employees = useSelector(selectEmployees)

    return(
        <div>
            <EmployeesGrid employees={employees} />
        </div>
    )
}