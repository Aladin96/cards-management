import React, {useState, useEffect} from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const EndDateForm = ({handleChange, unitValue, colorValue, disciplineValue, priceValue, startDateValue, status}) => {

    const [endDates, setEndDates] = useState([]);
    const [endDateValue, setEndDateValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
         
        let result;
        if(!status)    
            result = await axios.get(`${apiUrl}/card/filter?color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&start_date=${startDateValue}&status=${status}`, config());
        else
            result = await axios.get(`${apiUrl}/restore_cards/filter?unit=${unitValue}&color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&start_date=${startDateValue}&status=${status}`, config());

        setEndDates(result.data)
        setIsLoading(false)
  

        }
        handleChange(["end_date"], [""]);
        setEndDateValue("");
        setEndDates([])

        setIsLoading(true)
        fetchData();

    }, [startDateValue]);

    const handleOnChange = (e)=>{
        setEndDateValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }
return(<>
        <label forhtml="end_date">Date fin: </label>
        <div className="input-group">
            <select
                id="end_date"
                className="form-control form-control-lg"
                name="end_date"
                onChange={handleOnChange}
                value={endDateValue}
                required
                disabled={isLoading ? true : false}
            >
                <option value=""></option>
                {endDates.map((endDate) => (<option key={endDate} value={endDate}>{endDate}</option>))}
            </select>
            {isLoading && <span class="input-group-addon sping-form-loading">
                <i class="fa fa-refresh fa-spin"></i>
            </span>}
            </div>
    </>
    )
};
                      
export default EndDateForm;
                      