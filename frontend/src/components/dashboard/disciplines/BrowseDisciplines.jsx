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

import { browseDisciplines } from "../../../services/disciplineService";

const BrowseDisciplines = ({ match }) => {
  const numPage = match.params.numPage || 1;

  const [currentPage, setCurrentPage] = useState(+numPage);
  const [pages, setPages] = useState(0);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await browseDisciplines(currentPage);
      setDisciplines(data.disciplines);

      setPages(data.pages);
    }
    fetchData();
  }, [currentPage]);
  return (
    <>
      <PageContainer>
        <SideBar />
        <MainContent>
          <BreadCrumbs pageName="Les disciplines" />
          <MainContentInner>
            <Col classes="col-lg-12 mt-5">
              <Card>
                <CardBody>
                  <h4 className="header-title">Les disciplines: </h4>
                  <Table ths={["Discipline", "action"]}>
                    {disciplines.map((discipline) => (
                      <tr key={discipline._id}>
                        <th scope="row"> {discipline.discipline} </th>

                        <td> DELETE </td>
                      </tr>
                    ))}
                  </Table>
                </CardBody>
                <Pagination
                  path="/browse_disciplines"
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

export default BrowseDisciplines;
