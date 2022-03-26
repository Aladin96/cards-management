import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { token_name } from '../../services/tokenService';

import useAuth from "../../hooks/useAuth";


const PrivateRoute =  ({component: Component, path, permission=[], ...rest}) => { 

   
   const [isAuth, user, isPending] = useAuth(path);
  
      // اذا كان اليوزر مسجل والتوكن صحيح سيتم عرض الصفحة المحمية
      if(isAuth){
         if(!isPending){
            if(permission.includes(user.role))
                return <Route exact {...rest} render={(props) => <Component {...props} user={user} isPending={isPending} />}  />
            else
                return <Redirect to="/home" />
         }
         

      } 

      // في حال التكون غير صحيح سيتم جلب خطأ من الباكاند وسيتم حذف من لوكالستورج وتحويله على صفحة تسجيل الدخول
         if(isAuth == false){
            localStorage.removeItem(token_name);
            return <Redirect to="/" />
         } 
         
         return null;   



    
}
 
export default PrivateRoute;