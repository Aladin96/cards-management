import React, { useState } from "react";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import { UncontrolledAlert } from "reactstrap";
import { addColor } from "../../../services/optionService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddColors = () => {
  const [color, setColor] = useState("");
  const [alert, setAlert] = useState({ status: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addColor(color);
    response.type === "success"
      ? toast.success(response.message, {
          position: "bottom-left",
          autoClose: 10000,
        })
      : toast.error(response.message, {
          position: "bottom-left",
          autoClose: 10000,
        });
    setAlert(response);

    setColor("");
  };

  return (
    <div className="page-container">
      <SideBar />
      <div className="main-content">
        <BreadCrumbs pageName="Ajouter les couleurs" />
        <div className="main-content-inner">
          <div className="col-lg-12 mt-5">
            <div className="card">
              <div className="card-body">
                <h4>Ajouter les couleurs</h4>
                <UncontrolledAlert
                  color={alert.type}
                  isOpen={alert.status}
                  toggle={() => setAlert({ status: false })}
                >
                  {alert.message}
                </UncontrolledAlert>
                <ToastContainer />
                <div className="card-body">
                  <form
                    method="POST"
                    action=""
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <label forhtml="color">color: </label>
                    <input
                      id="color"
                      className="form-control"
                      name="color"
                      type="text"
                      placeholder="Ex: Rouge"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="btn btn-primary mt-4 pr-4 pl-4"
                    >
                      Confirmer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddColors;
