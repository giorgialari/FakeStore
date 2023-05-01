import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";

const useAuth = () => {
  const user = { loggedIn: sessionStorage.getItem("token") };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet></Outlet> : <Navigate to="/" />;
};
export default ProtectedRoutes;
