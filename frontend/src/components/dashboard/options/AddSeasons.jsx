import React, { useState } from "react";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";

import { UncontrolledAlert } from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../../layout/utilities/card/Card";
import CardBody from "../../layout/utilities/card/CardBody";
import MainContent from "../../layout/utilities/MainContent";
import MainContentInner from "../../layout/utilities/MainContentInner";
import PageContainer from "../../layout/utilities/PageContainer";
import Col from "../../layout/utilities/Col";
import { addSeason } from "../../../services/optionService";

const AddSeasons = () => {
  const [data, setData] = useState({ year1: "", year2: "" });

  const [alert, setAlert] = useState({ status: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addSeason(data);
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

    setData({ year1: "", year2: "" });
  };

  return (
    <PageContainer>
      <SideBar />
      <MainContent>
        <BreadCrumbs pageName="Ajouter une saison" />
        <MainContentInner>
          <Col classes="col-lg-12 mt-5">
            <Card>
              <CardBody>
                <h4>Ajouter saison :</h4>

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
                    <label forhtml="year1">année 1: </label>
                    <input
                      id="year1"
                      className="form-control"
                      name="year1"
                      type="text"
                      placeholder="Ex: 2020"
                      value={data.year1}
                      onChange={(e) =>
                        setData({ ...data, year1: e.target.value })
                      }
                      required
                    />

                    <label forhtml="year2">année 2: </label>
                    <input
                      id="year2"
                      className="form-control"
                      name="year2"
                      type="text"
                      placeholder="Ex: 2021"
                      value={data.year2}
                      onChange={(e) =>
                        setData({ ...data, year2: e.target.value })
                      }
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

export default AddSeasons;
