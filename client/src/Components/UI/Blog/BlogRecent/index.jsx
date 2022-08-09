import React from 'react'

/**
* @author
* @function BlogRecent
**/

const BlogRecent = (props) => {
    return (
        <>
            <div className="post">
                <div className="img-holder">
                    <img src={props.img} alt={props.author} />
                </div>
                <div className="details">
                    <h4><a href={props.link}>{props.heading}</a> </h4>
                    <span className="date">{props.date}</span>
                </div>
            </div>
        </>
    )
}


export default BlogRecent