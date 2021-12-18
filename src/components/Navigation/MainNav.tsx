import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/logo-getfit.svg";
import BurgerMenu from "../UI/BurgerMenu/BurgerMenu";

import "./mainNav.css";

/** 
 * Navigation component
 *   
 * 
 */

// Checks if the menu is open or not in responsive mode
function MainNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  // JSX
  return (
    <header className="fixedWrapper">
      <div className="logoWrapper">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
      </div>
      <nav className="navWrapper">
        <BurgerMenu open={isOpen} onToggleOpen={handleToggleOpen} />
        <ul className={`navBar ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/">Start a workout</NavLink>
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
