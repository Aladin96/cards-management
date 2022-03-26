import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2"

import {cardsSoldPerColorAndDisciplines} from "../../../../services/statisticsService";

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

const CardsSoldPerColorAndDiscipline = ({season}) => {

  const [disciplines, setDiscipline]= useState([]);

  const [handleDatasets, setHandleDatasets]= useState([]);

  useEffect(()=>{
    setHandleDatasets([])
    setDiscipline([])
    const fetchData = async ()=>{
      const { getDiscipline, obj } = await cardsSoldPerColorAndDisciplines(season);

      for(let color in obj){
        
        const bgColor = dynamicColor(color)
        setHandleDatasets(oldArr => [...oldArr, {
          label: `# Les cartes ${color}`,
          data: Object.values(obj[color]),
          backgroundColor: bgColor
        }])
        setDiscipline(getDiscipline)
        
      }
      

    }
    fetchData();
   }, [season]);

   const data = {
    labels: disciplines,
    datasets: handleDatasets,
  }

  const dynamicColor = (color) => {

    switch(color.toLowerCase()){
      case "rouge":
      case "red":
        return "#dc3545";

      case "vert":
      case "green":  
        return "#28a745";

      case "bleu":
      case "blue":  
        return "#007bff";

      case "mauve":
      case "purple":
       return "#6f42c1";

      case "orange":
        return "#fd7e14" 
       
      case "rose":
        return "#e83e8c";
      
      case "noire":
      case "noir":
      case "black": 
        return "#343a40";
       
     case "jaune":
       return "#ffc107"
      
     case "marron":
       return "#795548"  
      
     case "gris":
       return "#6c757d";

       default:
         return "#03e4a2";
    }
  } 

    return (
        <div class="col-lg-12 mt-5">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="header-title">Total des cartes vendues par Couleur et discipline</h4>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
        
      );
}
 
export default CardsSoldPerColorAndDiscipline;