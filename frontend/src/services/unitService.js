import http from "./httpService";
import {config} from "./authService";

const apiEndpoint = `${http.apiUrl}/units`; 

export const browseUnits = async (currentPage )=> {
    try{
        const { data } = await http.get(`${apiEndpoint}/?page=${currentPage}`, config());
        console.log(data)
        return data;
    }catch(err){
        return [];
    }
}