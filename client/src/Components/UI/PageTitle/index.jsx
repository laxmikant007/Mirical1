import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './PageTitle.css'


/**
* @author
* @function PageTitle
**/

const PageTitle = (props) => {
  return(
    <>
    <div className="page-title">
        <Container>
            <Row>
                <Col sm={12} className="col" >
                    <h2>{props.title}</h2>
                    <p>
                    {props.para}
                    </p>
                </Col>
            </Row>
        </Container>
    </div>
    </>
   )
  }


export default PageTitle