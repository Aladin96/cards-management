import React, {useState, useEffect} from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const SeasonForm = ({handleChange, unitValue, colorValue, disciplineValue, priceValue, startDateValue, endDateValue, status}) => {

    const [seasons, setSeasons] = useState([]);
    const [seasonValue, setSeasonValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
         
        let result;
        if(!status)    
            result = await axios.get(`${apiUrl}/card/filter?color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&start_date=${startDateValue}&end_date=${endDateValue}&status=${status}`, config());
        else
            result = await axios.get(`${apiUrl}/restore_cards/filter?unit=${unitValue}&color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&start_date=${startDateValue}&end_date=${endDateValue}&status=${status}`, config());

        setSeasons(result.data)
        setIsLoading(false)
  

        }
        handleChange(["season"], [""]);
        setSeasonValue("");
        setSeasons([])

        setIsLoading(true)
        fetchData();

    }, [endDateValue]);

    const handleOnChange = (e)=>{
        setSeasonValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }
return(<>
        <label forhtml="season">Saison: </label>
        <div className="input-group">
            <select
                id="season"
                className="form-control form-control-lg"
                name="season"
                onChange={handleOnChange}
                value={seasonValue}
                required
                disabled={isLoading ? true : false}
            >
                <option value=""></option>
                {seasons.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            {isLoading && <span class="input-group-addon sping-form-loading">
                <i class="fa fa-refresh fa-spin"></i>
            </span>}
            </div>
    </>
    )
};
                      
export default SeasonForm;
                      