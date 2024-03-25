import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Educations from "./pages/Educations";
import ImportEmployees from "./pages/ImportEmployees";
import AddEducation from "./pages/AddEducation";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import EducationPage from "./pages/EducationPage";

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
                element: <EmployeePage />
            },
            {
                path: '/educations',
                element: <Educations />
            },
            {
                path: '/educations/:educationId',
                element: <EducationPage />
            },
            {
                path: '/importEmployees',
                element: <ImportEmployees />
            },
            {
                path: '/addEducation',
                element: <AddEducation />
            },
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    }
])