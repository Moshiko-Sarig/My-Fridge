import { useSelector } from 'react-redux';
import { ReduxState } from '../../src/Components/LayoutArea/Layout/Layout';
import { Navigate } from 'react-router-dom';

interface AuthenticatedProps {
  children: React.ReactNode;
}

const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const logged = useSelector((state: ReduxState) => state.logged);
  const emailVerified = useSelector((state: ReduxState) => state.logged.userInfo.email_verified);


  return logged.isLogged && emailVerified ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default Authenticated;