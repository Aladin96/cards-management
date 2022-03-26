import React, { useState } from "react";

const Alert = ({ message, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  //useEffect(() => setDisplay(status))

  const onCloseD = () => setIsOpen(!isOpen);

  return (
    isOpen && (
      <div
        className={`alert alert-${type} alert-dismissible fade show`}
        role="alert"
      >
        <h3> {message} </h3>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={onCloseD}
        >
          <span className="fa fa-times"></span>
        </button>
      </div>
    )
  );
};

export default Alert;
