import { useSelector } from "react-redux";
import { selectIsLoading, selectVisibleEmployees } from "../redux/employees/selectors";
import EmployeesGrid from "../components/EmployeesGrid/EmployeesGrid";
import Center from "../components/Center/Center"
import Spinner from "../components/Spinner/Spinner";
import FilterInput from "../components/FilterInput/FilterInput"

export default function Employees(){

    const employees = useSelector(selectVisibleEmployees)
    const isLoading = useSelector(selectIsLoading)

    return(
        <>
            <Center>
                <FilterInput />
                <div>
                    {!isLoading && employees.length === 0 && (
                        <h2 align="center">Немає працівників</h2>
                    )}
                </div>
                <div>
                    {isLoading && (
                        <Spinner />
                    )}
                </div>
                <div>
                    {employees && employees.length !== 0 && !isLoading &&  (
                        <EmployeesGrid employees={employees} />
                    )}
                </div>
            </Center>
        </>
    )
}