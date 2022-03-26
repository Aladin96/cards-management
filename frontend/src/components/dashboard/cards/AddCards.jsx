import React, { useState, useEffect } from "react";
import axios from "axios";
import {config} from "../../../services/authService"
import {addCards} from "../../../services/cardService";
import {apiUrl} from "../../../services/httpService";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAllFieldsFill from "../../../hooks/useAllFieldsFill";

import BreadCrumbs from "../../layout/BreadCrumbs";
import SideBar from "../../layout/sidebar/SideBar";
import { UncontrolledAlert, Form, Button, Spinner } from 'reactstrap';

import Card from '../../layout/utilities/card/Card';
import CardBody from '../../layout/utilities/card/CardBody';
import MainContent from '../../layout/utilities/MainContent';
import MainContentInner from '../../layout/utilities/MainContentInner';
import PageContainer from '../../layout/utilities/PageContainer';
import Col from '../../layout/utilities/Col';




const AddCards = ({history}) => {
  const [data, setData] = useState({
    from: "",
    to: "",
    color: "",
    price: "",
    discipline: "",
    start_date: "",
    end_date: "",
    season: ""
  });
  
  const [colorData, setColorData] = useState([]);
  const [disciplineData, setDisciplineData] = useState([]);
  const [seasonData, setSeasonData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  
  const allFieldsFill = useAllFieldsFill(data);

  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
    
  useEffect(() => {

    const fetchData = async () => {
      
      try{
        const resultColors = await axios.get(`${apiUrl}/colors/name/all`, config());
        const resultDisciplines = await axios.get(`${apiUrl}/disciplines/name/all` , config());
        const resultSeasons = await axios.get(`${apiUrl}/season`, config());

        setColorData(resultColors.data);
        setDisciplineData(resultDisciplines.data);
        setSeasonData(resultSeasons.data)

      }catch(err){}
      
    }

    fetchData();
 
  }, []);



  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    
    
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    setIsLoading(true);
    const response = await addCards(data);
    
    setAlert(response)
    response.type === "success" ? toast.success(response.message, {position: "bottom-left", autoClose: 10000}) : toast.error(response.message, {position: "bottom-left", autoClose: 10000}) 
  
    setIsLoading(false);

  };

      

  
  return (
    <>
      <PageContainer>
          <SideBar />
          <MainContent>
              <BreadCrumbs pageName="Ajouter une carte" />
              <MainContentInner>
                  <Col classes="col-lg-12 mt-5" >
                      <Card>
                          <CardBody>
                            <h4>Ajouter les cartes</h4>
                              <CardBody>
                              
                                 <UncontrolledAlert color={alert.type} isOpen={alert.status} toggle={()=> setAlert({status: false})}>
                                  {alert.message}
                                 </UncontrolledAlert>
                                 <ToastContainer />
                              
                                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                  <div className="form-row">
                                    <div className="col-sm-3 my-1">
                                      <label forhtml="from">Du: </label>
                                      <input
                                        id="from"
                                        className="form-control"
                                        name="from"
                                        type="text"
                                        placeholder="Ex: 1"
                                        onChange={(e) => handleChange(e)}
                                        value={data.from}
                                        required
                                      />
                                    </div>
                                    <div className="col-sm-3 my-1">
                                      <label forhtml="to">Au: </label>
                                      <input
                                        id="to"
                                        className="form-control"
                                        name="to"
                                        type="text"
                                        placeholder="Ex: 100"
                                        onChange={(e) => handleChange(e)}
                                        value={data.to}
                                        required
                                      />
                                    </div>
                                  </div>

                                  <label forhtml="color">Couleur: </label>
                                  <select
                                    id="color"
                                    className="form-control form-control-lg"
                                    name="color"
                                    onChange={(e) => handleChange(e)}
                                    value={data.color}
                                  >
                                    <option value=""></option>
                                    {colorData.map((color)=> <option key={color} value={color}>{color}</option>)}
                                  </select>

                                  <label forhtml="price">Prix: </label>
                                  <input
                                    id="price"
                                    className="form-control"
                                    type="text"
                                    name="price"
                                    placeholder="Ex: 700"
                                    onChange={(e) => handleChange(e)}
                                    value={data.price}
                                    required
                                  />

                                  <label forhtml="discipline">Disciplines: </label>
                                  <select
                                    id="discipline"
                                    className="form-control form-control-lg"
                                    name="discipline"
                                    onChange={(e) => handleChange(e)}
                                    value={data.discipline}
                                  >
                                    <option value=""></option>
                                    {disciplineData.map((discipline)=> <option key={discipline} value={discipline}>{discipline}</option>)}
                                  </select>

                                  <label forhtml="start_date">Date debut: </label>
                                  <input
                                    id="start_date"
                                    className="form-control"
                                    type="date"
                                    name="start_date"
                                    onChange={(e) => handleChange(e)}
                                    value={data.start_date}
                                    required
                                  />

                                  <label forhtml="end_date">Date fin: </label>
                                  <input
                                    id="end_date"
                                    className="form-control"
                                    type="date"
                                    name="end_date"
                                    onChange={(e) => handleChange(e)}
                                    value={data.end_date}
                                    required
                                  />

                                  <label forhtml="season">Saison: </label>
                                  <select
                                    id="season"
                                    className="form-control form-control-lg"
                                    name="season"
                                    onChange={(e) => handleChange(e)}
                                    value={data.season}
                                  >
                                    <option value=""></option>
                                    {seasonData.map((season)=> <option key={season} value={season}>{season}</option>)}
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

export default AddCards;
