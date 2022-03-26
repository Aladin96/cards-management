import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {token_name} from "../../services/tokenService"

const GuestRoute = ({component: Component, ...rest}) => {
    const isAuth = !!localStorage.getItem(token_name);
    
    return(
        <Route {...rest} 
                component={ (props) =>
                     !isAuth ? (<Component {...props} />) : (<Redirect to="/add_cards" />)} />
    )
    
}
 
export default GuestRoute;