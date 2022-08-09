import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PageTitle from '../../Components/UI/PageTitle'
import serviceImg from '../../img/track.svg'
// import serviceImg from '../../img/service-vec.webp'
import './Service.css'
import ServiceGrid from '../../Components/UI/Grids/ServiceGrid'

/**
* @author
* @function Services
**/

const Services = (props) => {
  return(
    <>
    <PageTitle title="Services" para={<>This is where you'll know about all of our services we provide. <br /> Choose Any Service And Submit A Quote Then Our Team Will Reach Out To You. </>} />
    <section className="service-section section-padding" >
      <Container>
        <Row>
          <Col lg={4} className="col-12">
            <div className="service-grids right-align">
             <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="fas fa-code" heading="Web Development" link="/quote" para="Get an amazing and perfect website ready for your buisness." />
             <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="fas fa-search" heading="Seo Optimization" link="/quote" para="Make your website seo optimized and get them ranked in top list of google." />
             <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="fas fa-credit-card" heading="Finance Solutions" link="/quote" para="Have Some Financial Queries? Talk to our expert regarding GST/ITR and other financial Solutions." />
            </div>
          </Col>
          <Col lg={4} className="col-12">
            <div className="img-holder">
              <img src={serviceImg} alt="Services" />
            </div>
          </Col>
          <Col lg={4} className="col-12">
          <div className="service-grids right-col">
             <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="far fa-thumbs-up" heading="Digital Marketing" link="/quote" para="We Can Help You With Your Digital Marketing Related Queries." />
             {/* <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="far fa-file-alt" heading="Graphic Designing" link="/quote" para="Want an awesome design ready? Submit A Quote and our team will reach out to you." /> */}
             <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="far fa-money-bill-alt" heading="Earning Campaigns" link="/quote" para="Get Amazing Earning Opportunities By Working With Us As A Side Hustle." />
             <ServiceGrid gridClass="grid" iconDiv="icon" FontClass="far fa-user" heading="OTT Accounts" link="/quote" para="Buy OTT accounts like Netflix And Amazon Prime at very low rates." />
          </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
   )
  }


export default Services