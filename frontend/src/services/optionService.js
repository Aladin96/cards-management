import http from "./httpService";
import {config} from "./authService";

const apiEndpoint = http.apiUrl;

// * add Season

export const addSeason = async (data) => {

    try{
        const response = await http.post(`${apiEndpoint}/season`, data, config());

        const result = {
            status: true,
            type: "success",
            message: response.data.message
        }

        return result;
    }catch(err){
        const result = {
            status: true,
            type: "danger",
            message: err.response.data.message
        }
  
        return result;
    }
}

// * Add Colors 
export const addColor = async (color) => {

    try{
        const response = await http.post(`${apiEndpoint}/colors`, {color}, config());

        const result = {
            status: true,
            type: "success",
            message: response.data.message
        }

        return result;
    }catch(err){
        const result = {
            status: true,
            type: "danger",
            message: err.response.data.message
        }
  
        return result;
    }
}

// * Add Discipline
export const addDiscipline = async (discipline) => {

    try{
        const response = await http.post(`${apiEndpoint}/disciplines`, {discipline}, config());

        const result = {
            status: true,
            type: "success",
            message: response.data.message
        }

        return result;
    }catch(err){
        const result = {
            status: true,
            type: "danger",
            message: err.response.data.message
        }
  
        return result;
    }
}