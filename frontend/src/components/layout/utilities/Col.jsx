import React from 'react';

const Col = (props) => {
    return ( <div className={props.classes}>{props.children}</div> );
}
 
export default Col;