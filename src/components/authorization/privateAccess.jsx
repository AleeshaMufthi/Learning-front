import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateUser = () => {
    const user = localStorage.getItem("isAuth")
    return user ? <Outlet /> : <Navigate to={"/signin?private=true"} />
}

export {
    PrivateUser
}