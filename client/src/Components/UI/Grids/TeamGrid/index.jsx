import React from 'react'

/**
* @author
* @function TeamGrid
**/

const TeamGrid = (props) => {
    return (
        <>
            <div className="grid">
                <div className="img-holder">
                    <img src={props.imgSrc} alt={props.name} />
                </div>
                <div className="details">
                    <h4>{props.name}</h4>
                    <p>{props.desig}</p>
                    <ul className="clearfix">
                        <li><a href={props.instaLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" aria-hidden="true" /> </a> </li>
                        <li><a href={props.facebookLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" aria-hidden="true" /> </a> </li>
                        <li><a href={props.twitterLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" aria-hidden="true" /> </a> </li>
                        <li><a href={props.linkedinLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" aria-hidden="true" /> </a> </li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default TeamGrid