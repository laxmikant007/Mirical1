import React from 'react'
import './HomeHeadings.css'

/**
* @author
* @function HomeHeading
**/

const HomeHeading = (props) => {
    return (
        <>
            <div className={`${props.class} headingDiv`}>
                <span>{props.span} </span>
                <h2>
                    {props.h2}
                 </h2>
                 <p>{props.p} </p>
            </div>
        </>
    )
}


export default HomeHeading