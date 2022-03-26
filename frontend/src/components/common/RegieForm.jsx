import React, { useState } from 'react';

const RegieForm = ({handleChange, status, value}) => {
    const [regie, setRegie] = useState("");
    const handleOnChange = (e)=>{
        setRegie(e.target.value);
        handleChange([e.target.id], [e.target.value])
    }

    return (<> <label forhtml="unit">Livrer les cartes au regie: </label>
                <select
                id="unit"
                className="form-control form-control-lg"
                name="unit"
                onChange={handleOnChange}
                value= {regie}
                required
                >   
                <option value=""></option>
                    <option value="regie">regie</option>

                </select> 
        </>);
}
 
export default RegieForm;