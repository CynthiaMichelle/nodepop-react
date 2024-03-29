import { AuthButton } from "../auth/AuthButton";
import logo from "../../assets/logo.png";
import classNames from "classnames";

import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = ({ className }) => {
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
        <span> </span>
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
