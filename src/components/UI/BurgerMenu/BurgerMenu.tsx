import React from "react";

import "./burgerMenu.css";

/** 
 * Burger menu component
 *   
 * The burger menu "icon" that is shown when the application is 
 * in responsive mode
 * 
 */

const BurgerMenu: React.FC<{ open: boolean; onToggleOpen: any }> = ({
  open,
  onToggleOpen,
}) => {
  const burgerMenuClassName = `burgerMenu ${open ? "open" : ""}`;
  return (
    <div className={burgerMenuClassName} onClick={onToggleOpen}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerMenu;
