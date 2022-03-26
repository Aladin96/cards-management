import React from 'react';

const Card = (props) => {
    const style = props.style || null;
    return ( <div className="card" style={style}>{props.children}</div> );
}
 
export default Card;