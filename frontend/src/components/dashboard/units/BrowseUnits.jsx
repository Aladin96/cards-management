import React, { useState, useEffect } from "react";
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
import { browseUnits } from "../../../services/unitService";

const BrowseUnits = ({ match }) => {
  const numPage = match.params.numPage || 1;
  const [units, setUnits] = useState([]);

  const [currentPage, setCurrentPage] = useState(+numPage);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await browseUnits(currentPage);
      setUnits(data.units);

      setPages(data.pages);
    }
    fetchData();
  }, [currentPage]);

  return (
    <>
      <PageContainer>
        <SideBar />
        <MainContent>
          <BreadCrumbs pageName="Parcouri les unitées" />
          <MainContentInner>
            <Col classes="col-lg-12 mt-5">
              <Card>
                <CardBody>
                  <h4 className="header-title">Les cartes: </h4>
                  <Table ths={["Unité", "Adresse", "Telephoe", "Observation"]}>
                    {units.map((unit) => (
                      <tr key={unit._id}>
                        <th scope="row"> {unit.name_unite} </th>

                        <td> {unit.adress} </td>
                        <td> {unit.phone} </td>
                        <td> {unit.obs} </td>
                      </tr>
                    ))}
                  </Table>
                </CardBody>

                <Pagination
                  path="browse_units"
                  currentPage={currentPage}
                  pages={pages}
                  changePage={setCurrentPage}
                  range={5}
                />
              </Card>
            </Col>
          </MainContentInner>
        </MainContent>
      </PageContainer>
    </>
  );
};

export default BrowseUnits;
