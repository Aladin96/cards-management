import React from "react";
import Header from "./header/Header";

const BreadCrumbs = ({ pageName }) => {
  return (
    <>
      <Header />
      <div className="page-title-area">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="breadcrumbs-area clearfix mt-4 mb-2">
              <h4 className="page-title pull-left">{pageName}</h4>
              <ul className="breadcrumbs pull-left">
                <li>
                  <a href="#">{pageName}</a>
                </li>
                <li>
                  <span>{pageName}</span>
                </li>
              </ul>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default BreadCrumbs;
