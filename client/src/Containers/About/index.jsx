import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ServiceGrid from '../../Components/UI/Grids/ServiceGrid'
import PageTitle from '../../Components/UI/PageTitle'
import './About.css'
import aboutUs from '../../img/about.webp'
import whyUs from '../../img/why-choose-us-vec.webp'
import HomeHeading from '../../Components/UI/Home/HomeHeadings'


/**
* @author
* @function About
**/

const About = (props) => {
  return(
    <>
   <PageTitle title="About Us" para="This is where you will get to know about us, What we do and why you should trust us." />
    <section className="feature-section section-padding">
      <Container>
        <Row>
          <Col className="col-xs-12">
            <div className="feature-grids clearfix">
              <ServiceGrid gridClass="grid"  FontClass="fas fa-gem" heading="Digital Marketing" para="We help our clients with Digital Marketing content. We help to grow their social presence and gain a great amount of genuine audience." />
              <ServiceGrid gridClass="grid"  FontClass="fas fa-bullseye" heading="Web Development" para="We provide our clients with a mobile friendly and seo optimized website ready for their online presence at a very affordable price." />
              <ServiceGrid gridClass="grid"  FontClass="fas fa-envelope-open-text" heading="Earning Opportunity" para="We provide everyone amazing opportunities to earn some little side income with us so that everyone has a benefit while working with us." />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="about-us-section section-padding">
      <Container>
        <Row>
          <Col lg={6} xs={12} className="col about-us-data">
            <HomeHeading class="about-us-heading" span="About us" h2="Build Your Business with Our All In One Agency" />
            <div className="about-details">
              <h5>Get Ready To Get Your Buisness A Great Jump Start With Our Agency.</h5>
              <p>Have you been thinking about starting your buisness or simply earn some extra money? We're here for to help you in all your needs. We can help you develop a professional looking website for your buisness and list them among the top results of search engine.</p>
            </div>
          </Col>
          <Col lg={6} xs={12}>
            <div className="img-holder">
              <img src={aboutUs} alt="About Us" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="why-choose-us-section section-padding">
      <Container>
        <Row>
          <Col className="col" lg={6} md={12} xs={12}>
          <HomeHeading class="why-us-heading" span="We are the best" h2="Why Choose Us" p="We not only provide you with different types of excellent services but we also provide you with an opportunity to earn extra side income with us." />
          <div className="why-us-grids">
              <ServiceGrid gridClass="grid" iconDiv="icon"  FontClass="fas fa-rocket" heading="Fast Working Process" para="We make sure that our clients get fastest response from our side regarding any query." />
              <ServiceGrid gridClass="grid" iconDiv="icon"  FontClass="fas fa-gem" heading="Affordable Services" para="We make sure that our client gets best and affordable services." />
              <ServiceGrid gridClass="grid" iconDiv="icon"  FontClass="far fa-file-alt" heading="Dedicated and Friendly Team" para="Our team is highly dedicated and co-operative with all our clients." />
            </div>
          </Col>
          <Col className="col" lg={6} md={12} xs={12}>
            <div className="img-holder">
              <img src={whyUs} alt="Why Choose Us" />
            </div>
          </Col>
        </Row>
      </Container>

    </section>
    </>
   )
  }


export default About