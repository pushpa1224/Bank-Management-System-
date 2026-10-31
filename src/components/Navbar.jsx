import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🏦</span>
        <span className="brand-name">NovaTrust Bank</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/deposit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Deposit
          </NavLink>
        </li>
        <li>
          <NavLink to="/withdraw" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Withdraw
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
