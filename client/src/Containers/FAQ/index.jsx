import React from 'react'
import { Container, Col, Row, Accordion } from 'react-bootstrap'
import PageTitle from '../../Components/UI/PageTitle'
import HomeHeading from '../../Components/UI/Home/HomeHeadings'
import './faq.css'
import AccordionCard from '../../Components/UI/AccordionCard'
import FaqGrid from '../../Components/UI/Grids/FaqGrid'

/**
* @author
* @function FAQ
**/

const FAQ = (props) => {
    return (
        <>
            <PageTitle title="FAQ" para="Having Some Doubts Or Have Any Queries? Check Out Our Frequently Asked Questions To Clear Some Of Your Doubts And If You Still Have Some Questions Then Check Out Our Contact Section." />
            <section className="faq-section section-padding">
                <Container>
                    <Row>
                        <Col lg={6} className="col-12">
                            <HomeHeading class="faq-heading" span="04. FAQ" h2="You can get question answer from here!" p="Here are some of our Frequently asked questions. Please Have A Look!" />
                            <Accordion defaultActiveKey="0">
                                <AccordionCard title="1. What is The Miracle Solutions?" eventKey="0" para="We are a Web Digital Agency which means we provide you with different kinds of services like webiste development, graphic designing, financial solutions etc. but we are not limited to that we also provide our customers to earn with us. To know More Go To About Us Section." />
                                <AccordionCard title="2. Okay, I want a service from you, Where do I go?" eventKey="1" para="You can go to our services section then choose any service you want us to do for you then fill the form with required information and hit the Get A Quote Button then our team will contact you at the earliest." />
                                <AccordionCard title="3. My Question is not listed here, What to do now?" eventKey="2" para="You can go to contact us section and submit the contact form or you can contact us directly on whatsapp regarding any query." />
                            </Accordion>
                        </Col>
                        <Col lg={6} className="col-12">
                            <div className="faq-grids clearfix">
                                <FaqGrid dataCount="200" para="Happy Clients" plus />
                                <FaqGrid dataCount="10" para="Team Members" plus />
                                <FaqGrid dataCount="50" para="Projects" />
                                <FaqGrid dataCount="15" para="Achievements" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}


export default FAQ