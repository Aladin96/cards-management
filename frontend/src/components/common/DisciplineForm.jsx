import React, {useState, useEffect} from "react";
import axios from "axios";
import {config} from "../../services/authService"
import {apiUrl} from "../../services/httpService";

const DisciplineForm = ({handleChange, unitValue, colorValue, status}) => {

    const [disciplines, setDisciplines] = useState([]);
    const [disciplineValue, setDisciplineValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        
        const fetchData = async () => {
        let result;
        if(!status)
             result = await axios.get(`${apiUrl}/card/filter?color=${colorValue}&status=${status}`, config());
        else
            result = await axios.get(`${apiUrl}/restore_cards/filter?unit=${unitValue}&color=${colorValue}&status=${status}`, config());
        
            setDisciplines(result.data);
   
        setIsLoading(false)
        }
        
        handleChange(["discipline"], [""]);
        setDisciplineValue("");
        setDisciplines([])
        
        setIsLoading(true)
        fetchData();

    }, [colorValue]);

  

    const handleOnChange = (e)=>{
        setDisciplineValue(e.target.value);
        handleChange([e.target.id], [e.target.value]);
    }

return(<>

       <label forhtml="discipline">Disciplines: </label>
       <div className="input-group">
           <select
                id="discipline"
                className="form-control form-control-lg"
                name="discipline"
                onChange={handleOnChange}
                value={disciplineValue}
                required
                disabled={isLoading ? true : false}
            >
                <option value=""></option>
                {disciplines.map((discipline) => (<option key={discipline} value={discipline}>{discipline}</option>))}
            </select>
            {isLoading && <span className="input-group-addon sping-form-loading">
                <i className="fa fa-refresh fa-spin"></i>
            </span>}
            </div>
            
      </>
    )
};

export default DisciplineForm;
