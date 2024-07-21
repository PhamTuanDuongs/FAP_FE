import { Navigate, Outlet} from 'react-router-dom';
import TokenStorageService from '../services/TokenStorage';

const IsLogout = ({role}:{role:string}) => {
    const tokenStorageService = new TokenStorageService();
    const retrievedUser = tokenStorageService.getUser();
  
    if (tokenStorageService.getToken() || retrievedUser?.role == "Admin") {
        return <Navigate to="" replace />;
    }

    if (tokenStorageService.getToken() || retrievedUser?.role == "Student") {
        return <Navigate to="" replace />;
    }

    if (tokenStorageService.getToken() || retrievedUser?.role == "Teacher") {
        return <Navigate to="" replace />;
    }
  
    return <Outlet />;
  };

export default IsLogout;