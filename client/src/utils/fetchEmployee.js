import axios from "axios";

export const fetchEmployeeById = async ({params}) => {
    try {
        const res = await axios.get(`http://localhost:5000/employees/${params.employeeId}`)
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}