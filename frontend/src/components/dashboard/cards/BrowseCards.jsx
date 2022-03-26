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
import { browseCards } from "../../../services/cardService";

const BrowseCards = ({ match, location }) => {
  const numPage = match.params.numPage || 1;
  const [cards, setCards] = useState([]);

  const [currentPage, setCurrentPage] = useState(+numPage);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await browseCards(currentPage);
      setCards(data.cards);

      setPages(data.pages);
    }
    fetchData();
  }, [currentPage]);
  return (
    <>
      <PageContainer>
        <SideBar />
        <MainContent>
          <BreadCrumbs pageName="Parcouri les cartes" />
          <MainContentInner>
            <Col classes="col-lg-12 mt-5">
              <Card>
                <CardBody>
                  <h4 className="header-title">Les cartes: </h4>
                  <Table
                    ths={[
                      "Numero Carte",
                      "Couleur",
                      "Discipline",
                      "Prix",
                      "Date debut",
                      "Date fin",
                      "Saison",
                      "Status",
                      "Propriétaire",
                    ]}
                  >
                    {cards.map((card) => (
                      <tr key={card._id}>
                        <th scope="row"> {card.num_card} </th>

                        <td> {card.color} </td>
                        <td> {card.discipline} </td>
                        <td> {card.price} DA </td>
                        <td> {card.start_date.slice(0, 10)} </td>
                        <td> {card.end_date.slice(0, 10)} </td>
                        <td> {card.season} </td>

                        <td> {card.status ? "LIVRE" : "NON-LIVRE"}</td>
                        <td> {card.owner.toUpperCase()}</td>
                      </tr>
                    ))}
                  </Table>
                </CardBody>

                <Pagination
                  path="browse_cards"
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

export default BrowseCards;
