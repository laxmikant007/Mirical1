import React from 'react'
import { Link } from 'react-router-dom'

/**
* @author
* @function MainSection4Grid
**/

const MainSection4Grid = (props) => {
    return (
        <>
            <div className="home-section-4-grid">
                <div className="img-holder">
                    <img src={props.imgSrc} alt={props.title} />
                </div>
                <div className="details">
                    <div className="content">
                        <h3>
                            <Link to="/"> {props.title} </Link>
                        </h3>
                        <p>
                            {props.para}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default MainSection4Grid