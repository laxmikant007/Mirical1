import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
* @author
* @function MainSection3Card
**/

const MainSection3Card = (props) => {
    return (
        <>
            <Col className="col-xs-12 col-lg-4 col-sm-12 col-12">
                <Card>
                    <Card.Body>
                        <div className="d-flex">
                            <div className="home-section-3-icon">
                            <i className={`fas ${props.icon} ${props.extraClass}`} style={{backgroundColor: `${props.iconBg}`}} aria-hidden="true" />
                            </div>
                            <div style={{ flexDirection: "column" }}>
                                <h3><Link to="/" className="cardNavLink"> {props.title} </Link></h3>
                                <p>{props.para} </p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}


export default MainSection3Card