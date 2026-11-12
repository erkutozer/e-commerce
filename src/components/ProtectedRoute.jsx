import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const token = useSelector(store => store.auth.token);
    const location = useLocation();

    if (!token) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
}

export default ProtectedRoute