import React, { useState } from "react";
import axios from 'axios';
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import Alert from "../../layout/Alert";
import { config } from "../../../services/authService";
import {apiUrl} from "../../../services/httpService";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUnits = () => {

  const [data, setData] = useState({
    name_unite: "",
    adress: "",
    phone: "",
    obs: ""
  });

  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = ({target}) =>{
    const newData = {...data}
    newData[target.id] = target.value;
    setData(newData);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true)
    try {
      const result = await axios.post(`${apiUrl}/units/`, data, config());
      setAlert({ status: true, type: "success", message: result.data.message });
      setData({
        name_unite: "",
        adress: "",
        phone: "",
        obs: ""
      });

   toast.success(result.data.message, {position: "bottom-left", autoClose: 10000})
      
    } catch (err) {
      setAlert({
        status: true,
        type: "danger",
        message: err.response.data.message,
      });
      toast.error(err.response.message, {position: "bottom-left", autoClose: 10000}) 
    }
    setIsLoading(false)
  }

  const onClose = () => {
    setAlert({status: false, message:"", type:""})
  }
  return (
    <div className="page-container">
      <SideBar />
      <div className="main-content">
        <BreadCrumbs pageName="Ajouter les unités" />
        <div className="main-content-inner">
          <div className="col-lg-12 mt-5">
            <div className="card">
              <div className="card-body">
                <h4>Ajouter les unités</h4>
                {alert.status && <Alert message={alert.message} type={alert.type} onClose={onClose}/> }
                <ToastContainer />
                <div className="card-body">
                  <form method="POST" action="" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <label forhtml="name_unite">Nom d'unité: </label>
                    <input
                      id="name_unite"
                      className="form-control"
                      name="name_unite"
                      type="text"
                      value={data.name_unite}
                      onChange={handleChange}
                      placeholder="Ex: Mansourah"
                      required
                    />

                    <label forhtml="adress">Adresse: </label>
                    <input
                      id="adress"
                      className="form-control"
                      name="adress"
                      type="text"
                      value={data.adress}
                      onChange={handleChange}
                      placeholder="Ex: N°13 City imama Mansourah"
                      required
                    />

                    <label forhtml="phone">Télephone: </label>
                    <input
                      id="phone"
                      className="form-control"
                      name="phone"
                      type="text"
                      value={data.phone}
                      onChange={handleChange}
                      placeholder="Ex: 043 32 55 71"
                      required
                    />

                    <label forhtml="obs">Observation: </label>
                    <input
                      id="obs"
                      className="form-control"
                      name="obs"
                      type="text"
                      value={data.obs}
                      onChange={handleChange}
                      placeholder="Une remarque.."
                    />

                  {!isLoading ? 
                    <button
                      type="submit"
                      className="btn btn-primary mt-4 pr-4 pl-4"
                      disabled={data.name_unite? false : true}
                    >
                      Confirmer
                    </button> :
                    <span className="btn btn-primary mt-4 pr-4 pl-4">
                      <span class="input-group-addon">
                          <i class="fa fa-refresh fa-spin"></i>
                      </span>
                  </span>}
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

export default AddUnits;
