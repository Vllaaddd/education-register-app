import { useSelector } from "react-redux";
import { selectIsLoading, selectVisibleEmployees } from "../redux/employees/selectors";
import EmployeesGrid from "../components/EmployeesGrid/EmployeesGrid";
import Center from "../components/Center/Center"
import Spinner from "../components/Spinner/Spinner";
import FilterInput from "../components/FilterInput/FilterInput"
import FilterContainer from "../components/FilterContainer/FilterContainer";
import Filter from "../components/Filter/Filter";

export default function Employees(){

    const employees = useSelector(selectVisibleEmployees)
    const isLoading = useSelector(selectIsLoading)

    return(
        <>
            <Center>
                <FilterContainer>
                    <FilterInput />
                    <Filter />
                </FilterContainer>
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