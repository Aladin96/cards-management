import React from "react";
import $ from "jquery";

const FullView = () => {

    const requestFullscreen = function (ele) {
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
      } else {
        console.log("Fullscreen API is not supported.");
      }
    };
  
    const exitFullscreen = function () {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        console.log("Fullscreen API is not supported.");
      }
    };
  
    const fullView = (e)=>{
      e.preventDefault();
      requestFullscreen(document.documentElement);
      $("body").addClass("expanded");
    }
  
    const handleExitFullScreen = (e)=>{
      e.preventDefault();

      if (document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement ||
        document.msFullscreenElement) {
        
        exitFullscreen();
      }
      
      
      $('body').removeClass('expanded');
    }


  return (
    <>
      <li id="full-view" onClick={fullView}>
        <i className="ti-fullscreen"></i>
        Full view
      </li>
      <li id="full-view-exit" onClick={handleExitFullScreen}>
        <i className="ti-zoom-out"></i>
        Exit View
      </li>
    </>
  );
};

export default FullView;
