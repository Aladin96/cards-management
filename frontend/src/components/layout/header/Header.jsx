import React from "react";
import NavBtnSbarCollapsed from "./NavBtnSbarCollapsed";
import FullView from "./FullView";

const Header = () => {
 
  return (
    <div className="header-area">
      <div className="row align-items-center">
        <NavBtnSbarCollapsed />

        <div className="col-md-6 col-sm-4 clearfix">
          <ul className="notification-area pull-right">
           <FullView />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
