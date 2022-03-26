import {useState, useEffect} from "react";
import http from "../services/httpService";
import {config} from "../services/authService"
const useAuth = (location) => {

    const [isAuth, setIsAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [isPending, setIsPending]= useState(true)
    
    useEffect(()=>{
        const fetch = async () => {
      
            try{
                const data = await http.get(`${http.apiUrl}/auth/isAuth`, config());
                setIsAuth(true);
                
                setUser(data.data)
                setIsPending(false)
                
            }catch(err){
        
                 setIsAuth(false);   
                 setIsPending(false)
            }
        }

        fetch();
    }, [location])

    return [isAuth, user, isPending];
}
 
export default useAuth;