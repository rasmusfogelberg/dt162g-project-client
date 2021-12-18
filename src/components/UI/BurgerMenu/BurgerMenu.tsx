import React from "react";

import "./burgerMenu.css";

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
