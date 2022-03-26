import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import { totalCardsSoldPerDisciplineAndPrice } from '../../../../services/statisticsService';

const TotalCardsSoldPerDisciplineAndPrice = ({season}) => {

  const [disciplines, setDisciplines] = useState([])
  const [prices, setPrices] = useState([])
  const [sumPrice, setSumPrice] =useState(0);

  useEffect(()=>{

    setDisciplines([])
    setPrices([])

    const fetchData = async ()=>{
      const {totalCardsSold, totalCardPrice} = await totalCardsSoldPerDisciplineAndPrice(season);
      setSumPrice(totalCardPrice);
      for (let item of totalCardsSold){
        setDisciplines(oldArr => [...oldArr, item._id])
        setPrices(oldArr => [...oldArr, item.totalPrice])
      }
    }



    fetchData()
  }, [season])
    const data = {
        labels: disciplines,
        datasets: [
          {
            label: '# somme prix en DA',
            data: prices,
            fill: false,
            backgroundColor: 'rgb(67, 54, 251)',
            borderColor: 'rgba(0, 123, 255, 0.5)',
            borderWidth: 8
          },
        ],
      }
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          y: {
            stacked: true
        }
        },
      }
      return (<>
        <div class="col-lg-12 mt-5">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="header-title">Total des cartes vendues par Discipline et prix</h4>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
        
         <div className="user-profile ml-3">
          <b style={{color: "#fff"}}>Total Price: {sumPrice} DA</b>          
         </div>
       
        </>
      )
}
 
export default TotalCardsSoldPerDisciplineAndPrice;