import React, { useCallback, useState } from "react";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import Skeleton from 'react-loading-skeleton';

import RegieForm from "../../common/RegieForm";
import UnitForm from "../../common/UnitForm";
import FromToForm from "../../common/FromToForm";
import ColorForm from "../../common/ColorForm";
import DisciplineForm from "../../common/DisciplineForm";
import StartDateForm from "../../common/StartDateForm";
import EndDateForm from "../../common/EndDateForm";
import PriceForm from "../../common/PriceForm";
import SeasonForm from "../../common/SeasonForm";
import ClientForm from "../../common/ClientForm";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ReactStrap
import { UncontrolledAlert, Form, Button, Spinner } from 'reactstrap';


// Hooks
import useAllFieldsFill from "../../../hooks/useAllFieldsFill";

import Card from '../../layout/utilities/card/Card';
import CardBody from '../../layout/utilities/card/CardBody';
import MainContent from '../../layout/utilities/MainContent';
import MainContentInner from '../../layout/utilities/MainContentInner';
import PageContainer from '../../layout/utilities/PageContainer';
import Col from '../../layout/utilities/Col';


//Services
import { restoreCards } from "../../../services/cardService";
import { ROLE } from "../../../permission/roleEnum";

const RestoreCards = ({user, isPending}) => {
  const [data, setData] = useState({
    from: "",
    to: "",
    color: "",
    price: "",
    discipline: "",
    unit: "",
    start_date: "",
    end_date: "",
    season: ""
  });

  const [cardsTo, setCardsTo] = useState("");

  const allFieldsFill = useAllFieldsFill(data);

  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((keys, values) => {

    const newData = { ...data };
    keys.forEach((key, index) => newData[key] = values[index] )
    setData(newData);
    
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    
    const response = await restoreCards(data);

    setAlert(response)

    
    response.type === "success" ? toast.success(response.message, {position: "bottom-left", autoClose: 10000}) : toast.error(response.message, {position: "bottom-left", autoClose: 10000}) 
    setIsLoading(false)
   
  };


  return (
    <PageContainer>
          <SideBar />
          <MainContent>
              <BreadCrumbs pageName="Restituer les cartes" />
              <MainContentInner>
                  <Col classes="col-lg-12 mt-5" >
                      <Card>
                          <CardBody>
                            <h4>Restituer les cartes:</h4>
                            <UncontrolledAlert color={alert.type} isOpen={alert.status} toggle={()=> setAlert({status: false})}>
                                  {alert.message}
                            </UncontrolledAlert>
                            <ToastContainer />
                              <CardBody>                                
                              <Form method="POST" action="" encType="multipart/form-data" onSubmit={handleSubmit}>
                              
                              {isPending ? <Skeleton count={7} height={40} /> : <>
                   
                                {user.role === ROLE.COMPTABLE && <RegieForm handleChange={handleChange} value={data.unit}/> }

                                {user.role === ROLE.REGIE && <><div className="form-check">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="unit" onChange={() => { setData({...data, unit: ""}); setCardsTo("unit")}}/>
                                  <label className="form-check-label" for="exampleRadios1">
                                    Restituer les cartes:  <b>unitées</b>
                                  </label>
                                </div>

                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="client" onChange={() => {setData({...data, unit: ""}); setCardsTo("client")}} />
                                  <label className="form-check-label" for="exampleRadios2">
                                  Restituer les cartes <b>clients</b>
                                  </label>
                                </div></>}     

                                {cardsTo === "unit" && <UnitForm handleChange={handleChange} value={data.unit} status={true}/>}
                                {cardsTo === "client" && <ClientForm handleChange={handleChange} value={data.unit} status={true} />}
                                  <ColorForm handleChange={handleChange} unitValue={data.unit.split("|")[0]} status={true}/>

                                  <DisciplineForm handleChange={handleChange} unitValue={data.unit.split("|")[0]} colorValue={data.color} status={true}/>
                                  
                                  <PriceForm handleChange={handleChange} unitValue={data.unit.split("|")[0]}  colorValue={data.color} 
                                              disciplineValue={data.discipline} status={true}
                                  />
                                  
                                  <StartDateForm handleChange={handleChange} unitValue={data.unit.split("|")[0]} colorValue={data.color}
                                                  disciplineValue={data.discipline} priceValue={data.price} status={true}
                                  />
                                  
                                  <EndDateForm handleChange={handleChange} unitValue={data.unit.split("|")[0]} colorValue={data.color} 
                                                disciplineValue={data.discipline} priceValue={data.price} 
                                                startDateValue={data.start_date} status={true}
                                  />

                                  <SeasonForm handleChange={handleChange} unitValue={data.unit.split("|")[0]} colorValue={data.color} 
                                                  disciplineValue={data.discipline} priceValue={data.price} 
                                                  startDateValue={data.start_date} endDateValue={data.end_date} status={true}
                                    />
                                  
                                  <FromToForm handleChange={handleChange} unitValue={data.unit.split("|")[0]} colorValue={data.color} 
                                                  disciplineValue={data.discipline} priceValue={data.price} 
                                                  startDateValue={data.start_date}  endDateValue={data.end_date}
                                                  seasonValue={data.season} status={true}/>

                                    {!isLoading &&
                                   <Button color="primary"className="mt-4" outline={!allFieldsFill && true} disabled={!allFieldsFill && true} >
                                             Confirmer
                                   </Button>}
                                  {isLoading && <span className="btn btn-primary mt-4"><Spinner color="light" />Chargement</span>}
                               
                                </>}
                                </Form>
                              </CardBody>
                          </CardBody>
                      </Card>
                  </Col>
              </MainContentInner>
          </MainContent>
      </PageContainer>
  );
};

export default RestoreCards;
