import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import Pagination from "../../layout/Pagination";

import Card from "../../layout/utilities/card/Card";
import CardBody from "../../layout/utilities/card/CardBody";
import MainContent from "../../layout/utilities/MainContent";
import MainContentInner from "../../layout/utilities/MainContentInner";
import PageContainer from "../../layout/utilities/PageContainer";
import Col from "../../layout/utilities/Col";
import Table from "../../layout/utilities/table/Table";

// Services
import { exitMovement } from "../../../services/movementService";

//Hooks
import useFetch from "../../../hooks/useFetch";

const ExitMovements = ({ match }) => {
  const numPage = match.params.numPage || 1;
  const [mvOut, setMvOut] = useState([]);
  const [currentPage, setCurrentPage] = useState(+numPage);
  const [filter, setFilter] = useState("Unités/Clients");
  const [season, setSeason] = useState("Tous");
  const [pages, setPages] = useState(0);

  const [data] = useFetch("season");

  useEffect(() => {
    async function fetchData() {
      const data = await exitMovement(currentPage, filter, season);
      setMvOut(data.mvOut);
      setPages(data.pages);
    }
    fetchData();
  }, [currentPage, filter, season]);
  return (
    <PageContainer>
      <SideBar />
      <MainContent>
        <BreadCrumbs pageName="Mouvement de sortie" />
        <MainContentInner>
          <Col classes="col-lg-12 mt-5">
            <h4>
              Movement de sortie [ {filter} ] Saison [ {season} ]{" "}
            </h4>
            <div className="form-row">
              <label htmlFor="filter"></label>
              <select
                className="form-control form-control-xl col-2 mb-3"
                name="filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="Unités/Clients">Unités/Clients</option>
                <option value="Comptable">Comptable</option>
                <option value="Regie">Regie</option>
              </select>

              <label className="mr-3 mb-3" htmlFor="season">
                Saison
              </label>
              <select
                className="form-control form-control-xl col-2 mb-3"
                name="season"
                value={season}
                onChange={(e) => {
                  setSeason(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="Tous">Tous</option>
                {data.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <Card style={{ backgroundColor: "#FF5252", color: "#fff" }}>
              <CardBody>
                <h4 className="header-title" style={{ color: "#fff" }}>
                  Mouvement sortie:{" "}
                </h4>
                <Table
                  ths={[
                    "Serie Du:",
                    "Au",
                    "Livré au",
                    "Livré Par",
                    "Couleur",
                    "discipline",
                    "Prix",
                    "Date debut",
                    "Date fin",
                    "Saison",
                    "Nombre",
                    "Date Sortie",
                  ]}
                  color={"#fff"}
                >
                  {mvOut.map((mv) => (
                    <tr key={mv._id}>
                      <th scope="row"> {mv.from} </th>

                      <td> {mv.to} </td>
                      <td> {mv.unit} </td>
                      <td>
                        {" "}
                        {mv.delivredBy ||
                          (mv.restoredBy === "-"
                            ? "comptable"
                            : mv.restoredBy)}{" "}
                      </td>
                      <td> {mv.color} </td>
                      <td> {mv.discipline} </td>
                      <td> {mv.price} DA </td>
                      <td> {mv.start_date.slice(0, 10)} </td>
                      <td> {mv.end_date.slice(0, 10)} </td>
                      <td> {mv.season} </td>
                      <td> {mv.count} </td>
                      <td> {moment(mv.createdAt).format("L")} </td>
                    </tr>
                  ))}
                </Table>
              </CardBody>
            </Card>

            <div className="mt-3">
              <Pagination
                path="exit_movements"
                currentPage={currentPage}
                pages={pages}
                changePage={setCurrentPage}
                range={5}
              />
            </div>
          </Col>
        </MainContentInner>
      </MainContent>
    </PageContainer>
  );
};

export default ExitMovements;
