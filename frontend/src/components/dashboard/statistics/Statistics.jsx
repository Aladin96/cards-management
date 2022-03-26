import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadCrumbs from "../../layout/BreadCrumbs";
import SideBar from "../../layout/sidebar/SideBar";
import { apiUrl } from "../../../services/httpService";
import MainContent from "../../layout/utilities/MainContent";
import MainContentInner from "../../layout/utilities/MainContentInner";
import PageContainer from "../../layout/utilities/PageContainer";
import TotalCardsPie from "./components/TotalCardsPie";
import TotalCardsPerUser from "./components/TotalCardsPerUser";
import CardsSoldPerColorAndDiscipline from "./components/CardsSoldPerColorAndDiscipline";
import CardsSoldPerDisciplineAndPrice from "./components/CardsSoldPerDisciplineAndPrice";
import TotalCardsSoldPerDisciplineAndPrice from "./components/TotalCardsSoldPerDisciplineAndPrice";

import { config } from "../../../services/authService";
import TotalCardsPerUnit from "./components/TotalCardsPerUnit";

const Statistics = () => {
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/season`, config());
        setSeasons(data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <PageContainer>
        <SideBar />
        <MainContent>
          <BreadCrumbs pageName="Statistique" />
          <MainContentInner>
            <div>
              <label htmlFor="season">Choisir la saison</label>
              <select
                name="season"
                id="season"
                className="form-control col-2"
                onChange={(e) => {
                  setSeason(e.target.value);
                }}
              >
                <option value=""></option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <TotalCardsPie season={season} />
              <TotalCardsPerUser season={season} />
            </div>

            <div className="row">
              <CardsSoldPerColorAndDiscipline season={season} />
            </div>
            <div className="row">
              <CardsSoldPerDisciplineAndPrice season={season} />
            </div>

            <div className="row">
              <TotalCardsSoldPerDisciplineAndPrice season={season} />
            </div>

            <div className="row">
              <TotalCardsPerUnit season={season} />
            </div>
          </MainContentInner>
        </MainContent>
      </PageContainer>
    </>
  );
};

export default Statistics;
