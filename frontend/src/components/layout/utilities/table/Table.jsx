import React from 'react';
import { Table as T } from 'reactstrap';
const Table = (props) => {
    return (
        <div className="single-table">
            <div className="table-responsive">
                <T className="table table-hover progress-table text-center" style={{color: props.color}}>
                    <thead className="text-uppercase">
                        <tr>
                        {props.ths.map((th) => (<th key={th} scope="col">{th}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </T>
            </div>
        </div> 
         );
}
 
export default Table;