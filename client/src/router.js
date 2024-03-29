import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Educations from "./pages/Educations";
import ImportEmployees from "./pages/ImportEmployees";
import EditEmployee from "./pages/EditEmployee";
import AddEducation from "./pages/AddEducation";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import EducationPage from "./pages/EducationPage";
import { fetchEmployeeById } from "./utils/fetchEmployee";
import { fetchEducationById } from "./utils/fetchEducation";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/employees',
                element: <Employees />
            },
            {
                path: '/employees/:employeeId',
                element: <EmployeePage />,
                loader: fetchEmployeeById,
            },
            {
                path: '/editEmployee/:employeeId',
                element: <PrivateRoute component={EditEmployee} redirectTo={'/'} />,
                loader: fetchEmployeeById,
            },
            {
                path: '/educations',
                element: <Educations />
            },
            {
                path: '/educations/:educationId',
                element: <EducationPage />,
                loader: fetchEducationById,
            },
            {
                path: '/importEmployees',
                element: <PrivateRoute component={ImportEmployees} redirectTo={'/'} />
            },
            {
                path: '/addEducation',
                element: <PrivateRoute component={AddEducation} redirectTo={'/'} />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
        ]
    }
])