import React, {useState, useEffect} from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const PriceForm = ({handleChange, unitValue, colorValue, disciplineValue, status}) => {

    const [prices, setPrices] = useState([]);
    const [priceValue, setPriceValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
        let result;
        if(!status)
            result = await axios.get(`${apiUrl}/card/filter?color=${colorValue}&discipline=${disciplineValue}&status=${status}`, config());
         else
            result = await axios.get(`${apiUrl}/restore_cards/filter?unit=${unitValue}&color=${colorValue}&discipline=${disciplineValue}&status=${status}`, config());   
        
         setPrices(result.data);
        setIsLoading(false)

        }

        handleChange(["price"], [""]);
        setPriceValue("");
        setPrices([])

        setIsLoading(true)
        fetchData();
    }, [disciplineValue]);

    const handleOnChange = (e)=>{
        setPriceValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }

return(<>
       <label forhtml="price">Prix: </label>
       <div className="input-group">
            <select
                id="price"
                className="form-control form-control-lg"
                name="price"
                onChange={handleOnChange}
                value={priceValue}
                required
                disabled={isLoading ? true : false}
            >
                <option value=""></option>
                {prices.map((price) => (<option key={price} value={price}>{price}</option>))}
            </select>
            {isLoading && <span className="input-group-addon sping-form-loading">
                <i className="fa fa-refresh fa-spin"></i>
            </span>}
            </div>
      </>
    )
};

export default PriceForm;
