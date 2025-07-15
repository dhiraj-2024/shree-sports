// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    if (!isAuthenticated()) {
        // Redirect to login page, saving the current location they were trying to go to
        return <Navigate to="/shreeadmin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;