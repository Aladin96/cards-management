import React, {useEffect, useState} from 'react';
import { Bar } from "react-chartjs-2"

import {cardsSoldPerDisciplineAndPrice} from "../../../../services/statisticsService";

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
  }


const CardsSoldPerDisciplineAndPrice = ({season}) => {

  const [prices, setPrices]= useState([]);

  const [handleDatasets, setHandleDatasets]= useState([]);

  useEffect(()=>{
    setHandleDatasets([])
    setPrices([])
    const fetchData = async ()=>{
      const { getPrice, obj } = await cardsSoldPerDisciplineAndPrice(season);

      for(let discipline in obj){
        
        setHandleDatasets(oldArr => [...oldArr, {
          label: `# ${discipline}`,
          data: Object.values(obj[discipline]),
          backgroundColor: colorGen()
          
        }])
        setPrices(getPrice.map((v)=> v + " DA"))
        
      }
      

    }
    fetchData();
   }, [season]);

   const data = {
    labels: prices,
    datasets: handleDatasets,
  }


  
// Random Color RBG
const colorGen = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return "rgb(" + r + "," + g + "," + b + ")";

}

    return (
        <div class="col-lg-12 mt-5">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="header-title">Total des cartes vendues par Discipline et prix</h4>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
        
      );

}
 
export default CardsSoldPerDisciplineAndPrice;