import { Navigate, Outlet } from "react-router-dom";
import TokenStorageService from "../services/TokenStorage";

const IsAuthorized = ({ role }: { role: string }) => {
  const tokenStorageService = new TokenStorageService();
  const retrievedUser = tokenStorageService.getUser();

  if (!tokenStorageService.getToken() || retrievedUser?.role !== role) {
    console.log(tokenStorageService.getToken());
    console.log(tokenStorageService.getUser());
    return <Navigate to="/Unauthorized" replace />;
  }

  return <Outlet />;
};

export default IsAuthorized;
