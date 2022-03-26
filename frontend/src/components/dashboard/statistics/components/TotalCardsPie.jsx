import React, { useEffect, useState } from 'react';
import { Doughnut  } from "react-chartjs-2"
import { totalCardsPie } from '../../../../services/statisticsService';
const TotalCardsPie = ({season}) => {


    const [datas, setData] = useState([1, 1, 1, 1])

    const data = {
        labels: ['Cartes d\'entrées', 'Cartes de sortie'],
        datasets: [
          {
            label: '# cartes',
            data: datas,
            backgroundColor: [
            'rgba(5, 176, 133, 0.8)',
            'rgba(216, 88, 79, 0.8)',
            
            ],
            borderColor: [
              'rgba(5, 176, 133, 1)',
              'rgba(216, 88, 79, 1)',
            ],
            borderWidth: 3,
          },
        ],
      }

      useEffect(()=>{
        const fetchData = async ()=>{
          const {totalCardsEntry, totalCarsOut} = await totalCardsPie(season)
          setData([totalCardsEntry , totalCarsOut])
    
        }
        fetchData();
       }, [season]);

       console.log(season)
    return ( 
    
        <div class="col-lg-6 mt-5">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="header-title">Total des cartes</h4>
                    <Doughnut  data={data} width={100} height={100}/>
                </div>
            </div>
        </div>
     );
}
 
export default TotalCardsPie;