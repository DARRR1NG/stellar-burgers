import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

export interface IProtectedRouteProps {
  children: ReactElement;
  isAuth: boolean;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  isAuth = false
}) => {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  if (!user && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (user && isAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }
  return children;
};
