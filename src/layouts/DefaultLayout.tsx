import React from "react";

import MainNav from "../components/Navigation/MainNav";
import './default-layout.css';

const DefaultLayout: React.FC<any> = ({ children }) => {
  return (
    <>
      <div className="headerWrapper">
        <MainNav />
      </div>

      <div className="wrapper">{children}</div>
    </>
  );
};
export default DefaultLayout;