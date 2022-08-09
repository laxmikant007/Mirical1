import React from 'react'

/**
* @author
* @function ContactInfoList
**/

const ContactInfoList = (props) => {
  return(
    <>
     <li>
        <i className={`${props.iconName}`} aria-hidden="true"></i>
        <div className="contact-list-details">
        <h4>{props.heading}</h4>
        <p>{props.para}</p>
        </div>
    </li>
    </>
   )
  }


export default ContactInfoList