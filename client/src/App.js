import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getAllEmployees } from "./redux/employees/operations";
import { getAllEducations } from "./redux/educations/operations";
import { errorUpdate } from "./redux/auth/operations";

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmployees())
    dispatch(getAllEducations())
  }, [dispatch])

  useEffect(() => {
    dispatch(errorUpdate())
  }, [])

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}