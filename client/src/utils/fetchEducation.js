import axios from "axios";

export const fetchEducationById = async ({params}) => {
    try {
        const res = await axios.get(`http://localhost:5000/education/${params.educationId}`)
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}