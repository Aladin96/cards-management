import React, {useState, useEffect} from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const StartDateForm = ({handleChange, unitValue, colorValue, disciplineValue, priceValue, status}) => {

    const [startDates, setStartDates] = useState([]);
    const [startDateValue, setStartDateValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
        let result;
        if(!status)
            result = await axios.get(`${apiUrl}/card/filter?color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&status=${status}`, config());
        else
            result = await axios.get(`${apiUrl}/restore_cards/filter?unit=${unitValue}&color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&status=${status}`, config());
        
        setStartDates(result.data)
        setIsLoading(false)

        }
        handleChange(["start_date"], [""]);
        setStartDateValue("");
        setStartDates([])

        setIsLoading(true)
        fetchData();

    }, [priceValue]);

    const handleOnChange = (e)=>{
        setStartDateValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }

return(<>
        <label forhtml="start_date">Date debut:: </label>
        <div className="input-group">
            <select
                id="start_date"
                className="form-control form-control-lg"
                name="start_date"
                onChange={handleOnChange}
                value={startDateValue}
                required
                disabled={isLoading ? true : false}
            >
                <option value=""></option>
                {startDates.map((startDate) => (<option key={startDate} value={startDate}>{startDate}</option>))}
            </select>
            {isLoading && <span className="input-group-addon sping-form-loading">
                <i className="fa fa-refresh fa-spin"></i>
            </span>}
            </div>
    </>
    )
};
                      
export default StartDateForm;
                      