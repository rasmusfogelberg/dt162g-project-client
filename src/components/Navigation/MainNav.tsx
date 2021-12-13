import { Link } from "react-router-dom";

import "./mainNav.css";
function MainNav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">New Workout</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
