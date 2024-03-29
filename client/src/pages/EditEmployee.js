import { useLoaderData } from "react-router-dom"
import Center from "../components/Center/Center";
import EditForm from "../components/EditForm/EditForm";

export default function EditEmployee(){

    const data = useLoaderData()

    return(
        <Center>
            <EditForm data={data} />
        </Center>
    )
}