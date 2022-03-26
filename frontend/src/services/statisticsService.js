import http from "./httpService";
import {config} from "./authService";

const apiEndpoint = `${http.apiUrl}/statistics`; 


// * Total Cards Per User
export const totalCardsPerUser = async (season) => {

    try{
        const {data} = await http.get(`${apiEndpoint}/totalCardsPerUser?season=${season}`, config());
        return data;
    }catch(err){
        console.log(err);
    }

}

// * Total Cards Pie

export const totalCardsPie = async (season) => {
    try{
        const {data} = await http.get(`${apiEndpoint}/totalCardsPie?season=${season}`, config());
        return data;
    }catch(err){
        console.log(err);
    }   
}

// * Cards Sold per Color and Disciplines

export const cardsSoldPerColorAndDisciplines = async (season) => {
    try{
        const {data} = await http.get(`${apiEndpoint}/cardsSoldPerColorAndDiscipline?season=${season}`, config());
        return data;
    }catch(err){
        console.log(err);
    } 
}

// * Cards Sold per Disciplines And Price

export const cardsSoldPerDisciplineAndPrice = async (season) => {
    try{
        const {data} = await http.get(`${apiEndpoint}/cardsSoldPerDisciplineAndPrice?season=${season}`, config());
        return data;
    }catch(err){
        console.log(err);
    } 
}

// * Total Colors Sold Per Discipline And Price

export const totalCardsSoldPerDisciplineAndPrice = async (season) => {
    try{
        const {data} = await http.get(`${apiEndpoint}/totalCardsSoldPerDisciplineAndPrice?season=${season}`, config());
        return data;
    }catch(err){
        console.log(err);
    } 
}

// * Total Cards per unit

export const totalCardsPerUnits = async (season) => {
    try{
        const {data} = await http.get(`${apiEndpoint}/totalCardsPerUnits?season=${season}`, config());
        return data;
    }catch(err){
        console.log(err);
    } 
}