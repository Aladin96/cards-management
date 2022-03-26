import http from "./httpService";
import {config} from "./authService";

const apiEndpoint = `${http.apiUrl}/client`; 

export const addClient = async (data)=> {

    try{
        const response = await http.post(`${apiEndpoint}`, data, config());
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

// * Browse Clients

export const browseClient = async (currentPage)=>{
    const { data } = await http.get(
        `${apiEndpoint}?page=${currentPage}`, config()
      );
      return data;
} 