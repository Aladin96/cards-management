import  { useEffect, useState } from 'react';

const useAllFieldsFill = (data) => {

    const [allFieldsValue, setAllFieldsValue] = useState(false);

    useEffect(()=> handleFillAllFields(), [data])

    const handleFillAllFields = ()=>{
        const allFields = Object.values(data);
    
       for(let i=0;  i< allFields.length; i++){
         if(allFields[i].length == 0){
            setAllFieldsValue(false)
           break;
         }
         setAllFieldsValue(true)
        
       }
          
      }
    return allFieldsValue;
}
 
export default useAllFieldsFill;