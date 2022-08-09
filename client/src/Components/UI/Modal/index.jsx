import React from 'react'
import { Modal } from 'react-bootstrap';

/**
* @author
* @function Modal
**/

const ModalComp = ({props, title, body}) => {
  return(
   <>
    <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
      </Modal>
   </>
   )
  }


export default ModalComp