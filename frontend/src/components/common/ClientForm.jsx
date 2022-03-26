import React, { useState, useEffect } from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const ClientForm = ({handleChange, status}) => {
    const [clients, setClients] = useState([]);
    const [clientValue, setClientValue] = useState("")

    useEffect( () => {
        const fetchData = async () => {
            let res;
            if(!status)
                 res = await axios.get(`${apiUrl}/client/all`, config());
            else
                 res = await axios.get(`${apiUrl}/restore_cards/filter?access=client&status=${status}`, config())

            setClients(res.data);
   
        }
        fetchData();
        
    }, [status])

    const handleOnChange = (e)=>{
        setClientValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }
return(<>
        <label forhtml="unit">Client: </label>
        <select
        id="unit"
        className="form-control form-control-lg"
        name="unit"
        onChange={handleOnChange}
        value={clientValue}
        required
        >   
            <option value=""></option>
            {clients.map((client)=> (<option key={client._id} value={`${client.first_name} ${client.last_name}/${client.birthday.split("T")[0]}|${client._id}|client`}>{`${client.first_name} ${client.last_name}/${client.birthday.split("T")[0]}`}</option>))}

        </select>
      </>
    )
}
 
export default ClientForm;