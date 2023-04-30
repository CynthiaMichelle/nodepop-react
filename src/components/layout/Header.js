import Button from "../shared/Button";

import logo from "../../assets/logo.png";
import { logout } from "../auth/service";
import classNames from "classnames";

import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/context";

const Header = ({ className }) => {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header className={classNames("header", className)}>
      <Link to="/">
        <div className="header-logo">
          {<img src={logo} alt="nodepop-react" width="50" />}
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new" className="header-nav-item">
          Nuevo anuncio
        </NavLink>{" "}
        <NavLink to="/adverts" className="header-nav-item" end>
          Últimos anuncios
        </NavLink>
        {isLogged ? (
          <Button onClick={handleLogoutClick} className="header-button">
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            variant="primary"
            className="header-button"
            to="/login"
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
