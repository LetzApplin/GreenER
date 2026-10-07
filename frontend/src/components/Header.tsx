import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";

export function Header() {
  return (
    <header className="header-wrapper">
      <div className="app-header">
        <div className="header-logo-area">
          <img src={logo} alt="GreenER" className="header-logo" />
        </div>

        <nav className="app-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            HOME
          </NavLink>

          <NavLink
            to="/monitoramento"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            MONITORAMENTO
          </NavLink>

          <NavLink to="/analises">ANÁLISES</NavLink>

          <NavLink to="/sobre">SOBRE</NavLink>

          <NavLink to="/funcionamento">FUNCIONAMENTO</NavLink>
        </nav>

        <div className="header-user">
          <div className="notification">🔔</div>

          <div className="user-avatar">
            <span />
          </div>

          <div className="user-info">
            <span>Usuário</span>
            <small>user@greener.com</small>
          </div>
        </div>
      </div>
    </header>
  );
}
