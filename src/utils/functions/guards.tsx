import TokenStorageService from '../../services/TokenStorage';
import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ({role}:{role:string}) => {
    const tokenStorageService = new TokenStorageService();
    const retrievedUser = tokenStorageService.getUser();
  
    if (!tokenStorageService.getToken() || retrievedUser?.role !== role) {
        return <Navigate to="" replace />;
    }
  
    return <Outlet />;
  };

export default ProtectedRoute;
