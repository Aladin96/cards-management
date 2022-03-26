import React from "react";
import $ from "jquery";
const NavBtnSbarCollapsed = () => {

  return (
    <div className="col-md-6 col-sm-8 clearfix" onClick={() => $(".page-container").toggleClass("sbar_collapsed")}>
      <div className="nav-btn pull-left" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default NavBtnSbarCollapsed;
