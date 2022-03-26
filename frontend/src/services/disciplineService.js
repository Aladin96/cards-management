import http from "./httpService";
import {config} from "./authService";

const apiEndpoint = `${http.apiUrl}/disciplines`; 

export const browseDisciplines = async (currentPage )=> {
    try{
        const { data } = await http.get(`${apiEndpoint}/?page=${currentPage}`, config());
        return data;
    }catch(err){
        return [];
    }
}