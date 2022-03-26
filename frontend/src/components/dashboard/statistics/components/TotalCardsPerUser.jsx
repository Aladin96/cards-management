import React, { useEffect, useState } from 'react';
import { Doughnut  } from "react-chartjs-2"

import {totalCardsPerUser} from "../../../../services/statisticsService";

const TotalCardsPerUser = ({season}) => {

   const [datas, setData] = useState([1, 1, 1, 1])

   const dataPie = {
    labels: ['Cartes chez regie', 'Cartes chez Comptable', "Cartes chez les clients", "Cartes chez les unitées"],
    datasets: [
      {
        label: '# cartes',
        data: datas,
        backgroundColor: [
        'rgba(216, 88, 79, 0.8)',
        'rgba(5, 176, 133, 0.8)',
        'rgba(55, 220, 48, 0.8)',
        'rgba(51, 155, 224, 0.8)',
        ],
        borderColor: [
          'rgba(216, 88, 79, 1)',
          'rgba(5, 176, 133, 1)',
          'rgba(55, 220, 48, 1)',
          'rgba(51, 155, 224, 1)',
        ],
        borderWidth: 4,
      },
    ],
  }

   useEffect(()=>{
    const fetchData = async ()=>{
      const {totalClientsCards, totalComptableCards, totalRegieCards, totalUnitsCards} = await totalCardsPerUser(season)
      setData([totalRegieCards , totalComptableCards, totalClientsCards, totalUnitsCards])

    }
    fetchData();
   }, [season]);

    return ( 
    
        <div class="col-lg-6 mt-5">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="header-title">Total des cartes</h4>
                    <Doughnut  data={dataPie} width={100} height={100}/>
                </div>
            </div>
        </div>
     );
}
 
export default TotalCardsPerUser;