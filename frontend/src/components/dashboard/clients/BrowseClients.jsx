import React, {useState, useEffect} from "react";
import SideBar from "../../layout/sidebar/SideBar";
import BreadCrumbs from "../../layout/BreadCrumbs";
import Pagination from "../../layout/Pagination";

import Card from '../../layout/utilities/card/Card';
import CardBody from '../../layout/utilities/card/CardBody';
import MainContent from '../../layout/utilities/MainContent';
import MainContentInner from '../../layout/utilities/MainContentInner';
import PageContainer from '../../layout/utilities/PageContainer';
import Col from '../../layout/utilities/Col';
import Table from '../../layout/utilities/table/Table';

import { browseClient } from "../../../services/clientService";
import { useParams } from "react-router";

const BrowseClients = () => {

  const {numPage} = useParams();
  const [clients, setClients] = useState([]);
  const [countClients, setCountClients] = useState(0);
  const [currentPage, setCurrentPage] = useState(+numPage || 1);
  const [pages, setPages] = useState(0);
console.log(currentPage)
  useEffect(() => {
    async function fetchData() {
      const data = await browseClient(currentPage)
      setClients(data.clients);
      setCountClients(data.total);
      setPages(data.pages);
    }
    fetchData();
  }, [currentPage]);
  return (
    <>
      <PageContainer>
          <SideBar />
          <MainContent>
              <BreadCrumbs pageName="Parcourir les clients" />
              <MainContentInner>
                  <Col classes="col-lg-12 mt-5" >
                      <Card>
                          <CardBody>
                                  <h4 className="header-title">Les cartes: </h4>
                                  <Table ths={["Nom", "Prénom", "Date de naissance", "Sexe"]}>
                                  {clients.map((client) => (
                                      <tr key={client._id}>
                                      <th scope="row"> {client.first_name} </th>

                                      <td> {client.last_name} </td>
                                      <td> {client.birthday.slice(0, 10)} </td>
                                      <td> {client.gender} </td>
                                      </tr>
                                  ))}
                                  </Table>
                          </CardBody>

                          <Pagination
                              path="browse_clients"
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

export default BrowseClients;
