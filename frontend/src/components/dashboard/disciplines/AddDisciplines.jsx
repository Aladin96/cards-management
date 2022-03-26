import React, { useState } from "react";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import { UncontrolledAlert } from "reactstrap";
import Card from "../../layout/utilities/card/Card";
import CardBody from "../../layout/utilities/card/CardBody";
import MainContent from "../../layout/utilities/MainContent";
import MainContentInner from "../../layout/utilities/MainContentInner";
import PageContainer from "../../layout/utilities/PageContainer";
import Col from "../../layout/utilities/Col";
import { addDiscipline } from "../../../services/optionService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDisciplines = () => {
  const [discipline, setDiscipline] = useState("");
  const [alert, setAlert] = useState({ status: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addDiscipline(discipline);
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

    setDiscipline("");
  };

  return (
    <PageContainer>
      <SideBar />
      <MainContent>
        <BreadCrumbs pageName="Ajouter les disciplines" />
        <MainContentInner>
          <Col classes="col-lg-12 mt-5">
            <Card>
              <CardBody>
                <h4>Ajouter les disciplines:</h4>

                <CardBody>
                  <UncontrolledAlert
                    color={alert.type}
                    isOpen={alert.status}
                    toggle={() => setAlert({ status: false })}
                  >
                    {alert.message}
                  </UncontrolledAlert>
                  <ToastContainer />
                  <form
                    method="POST"
                    action=""
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <label forhtml="discipline">Discipline: </label>
                    <input
                      id="discipline"
                      className="form-control"
                      name="discipline"
                      type="text"
                      placeholder="Ex: Athlete"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="btn btn-primary mt-4 pr-4 pl-4"
                    >
                      Confirmer
                    </button>
                  </form>
                </CardBody>
              </CardBody>
            </Card>
          </Col>
        </MainContentInner>
      </MainContent>
    </PageContainer>
  );
};

export default AddDisciplines;
