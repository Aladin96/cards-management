import React, {useState} from "react";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import { UncontrolledAlert, Form, Button, Spinner } from 'reactstrap';

import Card from '../../layout/utilities/card/Card';
import CardBody from '../../layout/utilities/card/CardBody';
import MainContent from '../../layout/utilities/MainContent';
import MainContentInner from '../../layout/utilities/MainContentInner';
import PageContainer from '../../layout/utilities/PageContainer';
import Col from '../../layout/utilities/Col';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//HOOKS
import useAllFieldsFill from "../../../hooks/useAllFieldsFill";

// SERVICES

import {addClient} from "../../../services/clientService";

const AddClients = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    birthday: ""
  });
  
  const [isLoading, setIsLoading] = useState(false)
  
  const allFieldsFill = useAllFieldsFill(data);

  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
    
  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
     
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    setIsLoading(true);
    const response = await addClient(data);
    response.type === "success" ? toast.success(response.message, {position: "bottom-left", autoClose: 10000}) : toast.error(response.message, {position: "bottom-left", autoClose: 10000})
    setAlert(response)
    setIsLoading(false);
    setData({
      first_name: "",
      last_name: "",
      gender: "",
      birthday: ""
    })

  };

      

  
  return (
    <>
      <PageContainer>
          <SideBar />
          <MainContent>
              <BreadCrumbs pageName="Ajouter un client" />
              <MainContentInner>
                  <Col classes="col-lg-12 mt-5" >
                      <Card>
                          <CardBody>
                            <h4>Ajouter un client</h4>
                              <CardBody>
                              
                                 <UncontrolledAlert color={alert.type} isOpen={alert.status} toggle={()=> setAlert({status: false})}>
                                  {alert.message}
                                 </UncontrolledAlert>
                                 <ToastContainer />
                              
                                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                  <label forhtml="first_name">Nom: </label>
                                  <input
                                    id="first_name"
                                    className="form-control"
                                    type="text"
                                    name="first_name"
                                    placeholder="Ex: Benflane"
                                    onChange={(e) => handleChange(e)}
                                    value={data.first_name}
                                    required
                                  />

                                  <label forhtml="last_name">Prénom: </label>
                                  <input
                                    id="last_name"
                                    className="form-control"
                                    type="text"
                                    name="last_name"
                                    placeholder="Ex: Ahmed"
                                    onChange={(e) => handleChange(e)}
                                    value={data.last_name}
                                    required
                                  />

                                  <label forhtml="birthday">Date de naissance: </label>
                                  <input
                                    id="birthday"
                                    className="form-control"
                                    type="date"
                                    name="birthday"
                                    onChange={(e) => handleChange(e)}
                                    value={data.birthday}
                                    required
                                  />

                                  <label forhtml="gender">Sexe: </label>
                                  <select
                                    id="gender"
                                    className="form-control form-control-lg"
                                    name="gender"
                                    onChange={(e) => handleChange(e)}
                                    value={data.gender}
                                  >
                                    <option value=""></option>
                                    <option value="homme">Homme</option>
                                    <option value="femme">Femme</option>
                                  </select>

                                  {!isLoading &&
                                   <Button color="primary"className="mt-4" outline={!allFieldsFill && true} disabled={!allFieldsFill && true} >
                                             Confirmer
                                   </Button>}
                                  {isLoading && <span className="btn btn-primary mt-4"><Spinner color="light" />Chargement</span>}
                                 
                                </Form>
                              </CardBody>
                          </CardBody>
                      </Card>
                  </Col>
              </MainContentInner>
          </MainContent>
      </PageContainer>
    </>
  );
};

export default AddClients;
