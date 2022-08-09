import React from 'react'
import { Link } from 'react-router-dom'

/**
* @author
* @function ServiceGrid
**/

const ServiceGrid = (props) => {
    return (
        <>
            <div className={props.gridClass}>
                <div className={props.iconDiv}>
                    <i className={`${props.FontClass}`} aria-hidden="true" />
                </div>
                <h3>
                    {props.link ? <Link to={props.link}> {props.heading} </Link>: props.heading }
                
                {/* {props.heading} */}
                </h3>
                <p>{props.para}</p>
            </div>
        </>
    )
}


export default ServiceGrid