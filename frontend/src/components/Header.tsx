import "./Header.css";
import logo from "../../assets/logo.png";

export function Header() {
  return (
    <header className="header-wrapper">
      <div className="app-header">
        <div className="header-logo-area">
          <img
            src={logo}
            alt="GreenER"
            className="header-logo"
          />
        </div>

        <nav className="app-nav">
          <a href="/">HOME</a>
          <a href="/monitoramento">MONITORAMENTO</a>
          <a href="/analises">ANÁLISES</a>
          <a href="/sobre">SOBRE</a>
          <a href="/funcionamento" >
            FUNCIONAMENTO
          </a>
        </nav>

        <div className="header-user">
          <div className="notification">
            🔔
          </div>

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