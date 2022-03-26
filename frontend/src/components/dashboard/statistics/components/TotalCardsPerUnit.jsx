import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { totalCardsPerUnits } from "../../../../services/statisticsService";

const options = {
  scales: {
    yAxes: [
      {
        stacked: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: false,
      },
    ],
  },
};

const TotalCardsPerUnit = ({ season }) => {
  const [units, setUnits] = useState([]);
  const [totalCards, setTotalCards] = useState([]);
  const [bgColors, setBgColors] = useState([]);

  useEffect(() => {
    setUnits([]);
    const fetchData = async () => {
      const { totalCardsPerUnit } = await totalCardsPerUnits(season);

      for (let unit of totalCardsPerUnit) {
        setTotalCards((oldArr) => [...oldArr, unit.total]);
        setUnits((oldArr) => [...oldArr, unit.name]);
        setBgColors((oldArr) => [...oldArr, colorGen()]);
      }
    };
    fetchData();
  }, [season]);
  // Random Color RBG
  const colorGen = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return "rgb(" + r + "," + g + "," + b + ")";
  };
  const data = {
    labels: units,
    datasets: [
      {
        label: "Total Cards",
        data: totalCards,
        backgroundColor: bgColors,
      },
    ],
  };

  return (
    <div class="col-lg-12 mt-5">
      <div class="card">
        <div class="card-body pb-0">
          <h4 class="header-title">
            Total des cartes vendues par Discipline et prix
          </h4>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TotalCardsPerUnit;
