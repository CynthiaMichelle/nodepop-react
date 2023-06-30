import { Link } from 'react-router-dom';

import { ConfirmationButton } from '../common';
import { logout } from './service';
import { useAuth } from './context';

export const AuthButton = () => {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutClick}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login" style={{ marginLeft: '0.6rem' }}> Login</Link>
  );
};
