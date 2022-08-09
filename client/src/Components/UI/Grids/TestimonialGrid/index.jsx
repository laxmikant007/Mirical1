import React from 'react'

/**
* @author
* @function TestimonialGrid
**/

const TestimonialGrid = (props) => {
    return (
        <>
            <div className="grid" tabIndex="-1" style={{ width: "100%", display: "inline-block" }}>
                <div className="testimonial-img">
                    <img src={props.imgSrc}  alt={props.name} />
                </div>
                <div className="quote">
                <p>{props.para}</p>
                </div>
                <div className="info">
                    <h5>{props.name} </h5>
                    <p>{props.desig} </p>
                </div>
            </div>
        </>
    )
}


export default TestimonialGrid