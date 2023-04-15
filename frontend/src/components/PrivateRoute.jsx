import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {

    const access = localStorage.getItem('access')

    return (
        access ? <Outlet/> : <Navigate to='/auth/login'/>
    )
}

export default PrivateRoute;
