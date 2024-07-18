import { Navigate, Outlet} from 'react-router-dom';
import TokenStorageService from '../services/TokenStorage';

const IsLogin = () => {
    const tokenStorageService = new TokenStorageService();
    if (!tokenStorageService.getToken()) {
        return <Navigate to="" replace />;
    }
  
    return <Outlet />;
  };

export default IsLogin;