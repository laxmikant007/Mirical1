import React from 'react'
import { Accordion, Card } from 'react-bootstrap'

/**
* @author
* @function AccordionCard
**/

const AccordionCard = (props) => {
    return (
        <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
                    {props.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.eventKey}>
                    <Card.Body>{props.para} </Card.Body>
                </Accordion.Collapse>
            </Card>
        </>
    )
}


export default AccordionCard