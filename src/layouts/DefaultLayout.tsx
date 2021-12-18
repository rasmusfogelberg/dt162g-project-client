import React from "react";
import { Toaster } from "react-hot-toast";

import MainNav from "../components/Navigation/MainNav";
import './default-layout.css';

/* 
 * The default layout that sets the standard for all view/pages
 *
 */

const DefaultLayout: React.FC<any> = ({ children }) => {
  return (
    <>
      <div className="headerWrapper">
        <MainNav />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper">{children}</div>
    </>
  );
};
export default DefaultLayout;