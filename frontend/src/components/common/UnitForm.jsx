import React, { useState, useEffect } from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const UnitForm = ({handleChange, status}) => {

    const [units, setUnits] = useState([]);
    const [unitValue, setUnitValue] = useState("")

    useEffect( () => {
        const fetchData = async () => {
            let res;
            if(!status)
                 res = await axios.get(`${apiUrl}/units/name/all`, config());
            else
                 res = await axios.get(`${apiUrl}/restore_cards/filter?access=unit&status=${status}`, config())
                 
            setUnits(res.data);
   
        }
        fetchData();
        
    }, [])

    const handleOnChange = (e)=>{
        setUnitValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }
return(<>
        <label forhtml="unit">Nom d'unité: </label>
        <select
        id="unit"
        className="form-control form-control-lg"
        name="unit"
        onChange={handleOnChange}
        value={unitValue}
        required
        >   
            <option value=""></option>
            {units.map((unit)=> (<option key={unit._id} value={`${unit.name_unite}|${unit._id}|unit`}>{unit.name_unite}</option>))}

        </select>
      </>
    )
};

export default UnitForm;
