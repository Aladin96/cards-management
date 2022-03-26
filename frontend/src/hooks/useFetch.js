import { useEffect, useState } from 'react';
import http from "../services/httpService"
import {config} from "../services/authService";

const useFetch = (props) => {

    const [data, setData] = useState([]);

    useEffect(()=>{
       
        const fetchData = async () => {
            try{
                const response = await http.get(`${http.apiUrl}/${props}`, config());
                setData(response.data);
            }catch(err){ }          
        }

        fetchData();
    }, [])
    return [data];
}
 
export default useFetch;