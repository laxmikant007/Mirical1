/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

/**
* @author
* @function BlogList
**/

const BlogList = ({ blogThumbnail, heading, date, link, authorLink, author, content, category, id }) => {
    return (
        <>
            <div className="post standard-format">
                <div className="entry-media">
                    <img src={blogThumbnail} alt={heading} />
                    <div className="cat"> {category} </div>
                </div>
                <div className="entry-meta">
                    <span>{date}</span>
                    <span>By: <a href={authorLink}> {author}</a></span>
                </div>
                <div className="entry-details">
                    <h3> <a href={link}> {heading} </a>
                    </h3>
                    <p key={id}>{content}</p>
                    <a className="read-more" href={link}>Read Full Post</a>
                </div>
            </div>
        </>
    )
}


export default BlogList