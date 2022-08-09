import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PageTitle from '../../Components/UI/PageTitle'
import groupImg from '../../img/group-img.webp'
import HomeHeading from '../../Components/UI/Home/HomeHeadings'
import './Testimonial.css'
import TestimonialGrid from '../../Components/UI/Grids/TestimonialGrid';
import Slider from "react-slick";


/**
* @author
* @function Testimonials
**/

const Testimonials = (props) => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <>
      <PageTitle title="Testimonials" para="This is where you can see what our clients has to say about our services." />
      <section className="testimonial-section section-padding" >
        <Container>
          <Row>
            <Col lg={6} md={12} className="col-12">
              <img src={groupImg} alt="Testimonial Group" />
            </Col>
            <Col lg={6} md={12} className="col-12 testimonials-area">
              <HomeHeading class="testimonial-heading" span="Testimonials" h2="Check what’s our client say about us!" />
              <Slider {...sliderSettings}>

                <TestimonialGrid
                  para='“Your customer service is very good and your team is also very helpful and friendly. I got my website ready as expected and according to my requirements without any problem. I definitely recommend others to get their services done by here only.”'
                  name="Anshul Laddha"
                  desig="Happy Client, Bhilwara, India"
                />

                <TestimonialGrid
                  para='“It has been a nice experience being with your agency. You helped me to earn some side money with little efforts only. I am very happy to be a part of this community.”'
                  name="Devendra Singh"
                  desig="Happy Client, Jalore, Rajasthan"
                />

                <TestimonialGrid
                  para='“Being a part of this team is an amazing and wonderfull experience where we all learn and earn together. All of our clients also have a wonderfull experience with us and highly recommend working with us or getting services from us.”'
                  name="Nipun Goyal"
                  desig="Team Member, Bharatpur, India"
                />

              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}


export default Testimonials