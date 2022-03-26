import http from "./httpService";
import {config} from "./authService";

// * Add Cards 

export const addCards = async (data) => {
    try {
    
        const response = await http.post(`${http.apiUrl}/card`, data, config());
       
        const result = {
            status: true,
            type: "success",
            message: response.data.message
        }

        return result;
      } catch (err) {

        const result = {
            status: true,
            type: "danger",
            message: err.response.data.message
        }
  
        return result;
          
      }

}

// * Deliver Cards 

export const deliverCards = async (data) => {
  
    try {
        const response = await http.post(`${http.apiUrl}/deliver_cards`, data, config());
 
         return {status: true, type:"success", message: response.data.message}
      } catch (err) {
    
        return { status: true, type: "danger", message: err.response.data.message }
      }
}

// * Restore Cards

export const restoreCards = async (data) => {
    try{

        const response = await http.post(`${http.apiUrl}/restore_cards`, data, config());
        return { status: true, type: "success", message: response.data.message } 

    }catch(err){
        return { status: true, type: "danger", message: err.response.data.message }
    }
}

// * Browse Cards

export const browseCards = async (currentPage) => {
    const { data } = await http.get(
        `${http.apiUrl}/card?page=${currentPage}`, config()
      );
      return data;
}