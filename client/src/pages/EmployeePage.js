import Center from "../components/Center/Center";
import { useLoaderData } from "react-router-dom";
import Employee from "../components/Employee/Employee";

export default function EmployeePage(){

    const data = useLoaderData()

    return(
        <>
            <Center>
                <Employee data={data} />
            </Center>
        </>
    )
}