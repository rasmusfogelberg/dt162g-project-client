import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/logo-getfit.svg";

import "./mainNav.css";

function MainNav() {
  return (
    <header className="fixedWrapper">
      <div className="logoWrapper">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
      </div>
      <nav className="navWrapper">
        <ul>
          <li>
            <NavLink to="/">New Workout</NavLink>
          </li>
          <li>
            <NavLink to="/archive">Archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
