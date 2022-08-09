// Basic Imports
import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ModalVideo from 'react-modal-video'
import Slider from "react-slick";

// Components Import
import MainSection3Card from '../../Components/UI/Home/MainSection3Card'
import HomeHeading from '../../Components/UI/Home/HomeHeadings'
import ServiceGrid from '../../Components/UI/Grids/ServiceGrid'
// import MainSection4Grid from '../../Components/UI/Grids/MainSection4Grid'
import TestimonialGrid from '../../Components/UI/Grids/TestimonialGrid';

// Css Import
import './Home.css'

// Images Import
import home2img from '../../img/home-section-2.webp'
// import vidImg from '../../img/video-img.webp'
import vidImg from '../../img/customer_service.svg'
// import port1 from '../../img/img-1.webp'
// import port2 from '../../img/img-2.webp'
// import port3 from '../../img/img-3.webp'
// import port4 from '../../img/img-4.webp'
// import port5 from '../../img/img-5.webp'
// import port6 from '../../img/img-6.webp'
// import test1 from '../../img/f1.webp'
import anshulTest from '../../img/anshul.webp'
import devenTest from '../../img/deven.webp'
import nipunTest from '../../img/nipun.webp'
// import test2 from '../../img/f2.webp'
// import heroVec from '../../img/10140.webp'
import heroVec from '../../img/hero-vec.webp'
// import heroVec from '../../img/hero.webp'

/**
* @author
* @function Home
**/

const Home = (props) => {

  const [isOpen, setOpen] = useState(false)
  const sliderSettings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <>
      <div className="Home-div">

        {/* Hero Section */}
        <section className="hero-section">
            <div className="container hero-container">
              <Row>
                <Col md={8}>
                  <div className="slide-heading">
                    <h2>Miracle Solutions</h2>
                    <span>Best Place To Work</span>
                  </div>
                  <div className="slide-text">
                    <p>
                      This is the one place stop for all your needs. We Provide you with various services and exclusive offers. Explore our website to know more.
                    </p>
                  </div>
                  <div>
                    <Link to="/about" className="btn-theme">More About Us</Link>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="hero-vec">
              <img src={heroVec} alt="Hero Vector" />
            </div>
        </section>

        {/* About Us Section */}
        <section className="section-padding about-us-home-section home-section-1">
            <Container>
              <Row>
                <Col lg={6} xs={12}>
                <div className="feature-grids clearfix">
                <ServiceGrid gridClass="grid" FontClass="fas fa-laptop-code font-icon" heading="Web Development" para="Get Yourself a Professional Website Developed." />
                <ServiceGrid gridClass="grid" FontClass="fas fa-users font-icon" heading="Marketing" para="Earn Some Money With Us Doing Marketing Campaigns." />
                <ServiceGrid gridClass="grid" FontClass="fas fa-search-dollar font-icon" heading="SEO Optimization" para="List Your Website In Top Pages With An Expert." />
               </div>
                </Col>
                <Col className="col" lg={6} xs={12}>
                  <HomeHeading class="home-section-1-heading" span="01. About Us" h2="Build Your Business with Our All In One Agency" />
                  <div className="home-section-1-details">
                    <h5>
                      Get Ready To Get Your Buisness A Great Jump Start With Our Agency.
                    </h5>
                    <p>
                    Have you been thinking about starting your buisness or simply earn some extra money? We're here for to help you in all your needs. We can help you develop a professional looking website for your buisness and list them among the top results of search engine. 
                    </p>
                    <Link to="/about" className="btn-theme">More About Us</Link>
                  </div>
                </Col>
              </Row>
            </Container>
        </section>

        {/* Why Choose Us Section  */}
        <section className="section-padding why-choose-us-section home-section-2">
            <Container>
              <Row>
                <Col className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                  <HomeHeading class="home-section-2-heading" span="02. Why Choose Us" h2="We Provide You Both Services And Earning Opprotunity" p="We not only provide you with different types of services but we also provide you with an opportunity to earn extra side income with us." />
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12} className="img-div">
                  <div className="img-holder">
                    <img src={home2img} alt="Home Section 2" className="home-section-2-img" />
                  </div>
                </Col>
                <Col lg={6} xs={12} md={6} sm={12}>
                  <div className="about-us-grids clearfix">
                  <ServiceGrid iconDiv="icon" gridClass="about-grid" FontClass="fas fa-laptop-code" heading="Web Development" para="Get Yourself a Professional Website Developed." />
                  <ServiceGrid iconDiv="icon" gridClass="about-grid" FontClass="fas fa-users" heading="Marketing" para="Earn Some Money With Us Doing Marketing Campaigns." />
                  <ServiceGrid iconDiv="icon" gridClass="about-grid" FontClass="fas fa-search-dollar" heading="SEO Optimization" para="List Your Website In Top Pages With An Expert." />
                  </div>
                </Col>
              </Row>
            </Container>
        </section>

        {/* Services Section */}
        <section className="section-padding services-home-section home-section-3">
            <Container>
              <Row>
                <Col className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                  <HomeHeading class="home-section-3-heading" span="03. Best Services" h2="We Provide Better Service For Your Business" p="Look at all the different service we provide and choose the one that fits you right and leave the rest up to us." />
                </Col>
              </Row>
              <Row>
                <div className="home-section-3-grids">
                  <MainSection3Card icon="fa-code" iconBg="#f2dcd3" extraClass="card1" title="Web Development" para="A Professional Website Developed For Your Buisness." />
                  <MainSection3Card icon="fa-search" iconBg="#d4d6f8" extraClass="card2" title="SEO Optimization" para="List Your Website Aming The Top Results Of Search Engine." />
                  <MainSection3Card icon="fa-credit-card" iconBg="#c2dfcd" extraClass="card3" title="GST & ITR Solutions" para="Solve All Of Your Financial Queries With Us." />
                </div>
              </Row>
              <Row>
                <div className="home-section-3-grids">
                  <MainSection3Card icon="fa-thumbs-up" iconBg="#e0e8c9" extraClass="card4" title="Digital Marketing" para="We can Help You With Digital Marketing and helping you grow." />
                  <MainSection3Card icon="fa-star" iconBg="#f2dcd3" extraClass="card5" title="Earning Campaigns" para="Earn with Us While Doing Some Marketing Campaigns." />
                  <MainSection3Card icon="fa-file" iconBg="#efc9d5" extraClass="card6" title="Graphic Designing" para="Need an awesome design? We're to help you get that." />
                </div>
              </Row>
            </Container>
        </section>

        {/* Portfolio Section */}
        {/* <section className="section-padding portfolio-section home-section-4">
            <Container>
              <Row>
                <Col className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                  <HomeHeading class="home-section-4-heading clearfix" span="04. Portfolio" h2="Please check out our recent works" p="This is some of our recent work for you to check out." />
                </Col>
              </Row>
              <Row>
                <Col className="col col-xs-12">
                  <div className="portfolio-grids clearfix">
                    <MainSection4Grid title="Digital Marketing" imgSrc={port1} para="Agency" />
                    <MainSection4Grid title="Web Development" imgSrc={port2} para="Agency" />
                    <MainSection4Grid title="SEO Optimization" imgSrc={port3} para="Agency" />
                    <MainSection4Grid title="Marketing Campaigns" imgSrc={port4} para="Agency" />
                    <MainSection4Grid title="PPC Marketing" imgSrc={port5} para="Agency" />
                    <MainSection4Grid title="Graphic Designing" imgSrc={port6} para="Agency" />
                  </div>
                </Col>
              </Row>
            </Container>
        </section> */}

        {/* Video CTA section */}
        <section className="video-cta-area">
          <Container>
            <Row>
              <Col className="col-xs-12">
                <div className="video-img-holder img-holder">
                  <img src={vidImg} alt="video vector" />
                  <div className="video-btn">
                    <div>
                      <ModalVideo openMessage="You Just Opened Our Special Video" dismissBtnMessage="Close the video by clicking here" channel='youtube' autoplay={1} controls={0} showinfo="0" mute={1} isOpen={isOpen} 
                        // videoId="TVShZg9X5V0" 
                        videoId="HwLW8s03BGA"
                        onClose={() => setOpen(false)} 
                      />
                    </div>
                    <button onClick={() => setOpen(true)} className="wrap">
                      <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjk0Ljg0MyAyOTQuODQzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTQuODQzIDI5NC44NDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0yNzguNTI3LDc5Ljk0NmMtMTAuMzI0LTIwLjAyMy0yNS4zOC0zNy43MDQtNDMuNTM4LTUxLjEzMmMtMi42NjUtMS45Ny02LjQyMS0xLjQwNy04LjM5MiwxLjI1N3MtMS40MDcsNi40MjEsMS4yNTcsOC4zOTINCgkJYzE2LjY4NywxMi4zNCwzMC41MjEsMjguNTg2LDQwLjAwOCw0Ni45ODNjOS45NCwxOS4yNzcsMTQuOTgsNDAuMTI4LDE0Ljk4LDYxLjk3NmMwLDc0LjY3MS02MC43NSwxMzUuNDIxLTEzNS40MjEsMTM1LjQyMQ0KCQlTMTIsMjIyLjA5MywxMiwxNDcuNDIxUzcyLjc1LDEyLDE0Ny40MjEsMTJjMy4zMTMsMCw2LTIuNjg3LDYtNnMtMi42ODctNi02LTZDNjYuMTMzLDAsMCw2Ni4xMzMsMCwxNDcuNDIxDQoJCXM2Ni4xMzMsMTQ3LjQyMSwxNDcuNDIxLDE0Ny40MjFzMTQ3LjQyMS02Ni4xMzMsMTQ3LjQyMS0xNDcuNDIxQzI5NC44NDIsMTIzLjk3NywyODkuMjAxLDEwMC42NDUsMjc4LjUyNyw3OS45NDZ6Ii8+DQoJPHBhdGggZD0iTTEwOS42OTksNzguOTY5Yy0xLjg3NiwxLjA2Ny0zLjAzNSwzLjA1OS0zLjAzNSw1LjIxNnYxMzEuNjc0YzAsMy4zMTQsMi42ODcsNiw2LDZzNi0yLjY4Niw2LTZWOTQuNzRsODguODMzLDUyLjg4Mw0KCQlsLTY1LjMyNCw0Mi4wODdjLTIuNzg1LDEuNzk1LTMuNTg5LDUuNTA4LTEuNzk0LDguMjkzYzEuNzk2LDIuNzg2LDUuNTA4LDMuNTksOC4yOTQsMS43OTRsNzMuNDY1LTQ3LjMzMw0KCQljMS43NDYtMS4xMjUsMi43ODYtMy4wNzMsMi43NDktNS4xNWMtMC4wMzctMi4wNzctMS4xNDUtMy45ODctMi45My01LjA1TDExNS43MzMsNzkuMDI5DQoJCUMxMTMuODc3LDc3LjkyNiwxMTEuNTc1LDc3LjkwMiwxMDkuNjk5LDc4Ljk2OXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" alt="Play Button" />
                    </button>
                  </div>
                </div>
                <div className="content">
                  <h2>
                    Have A Query? Feel Free To Contact With Us!
                  </h2>
                  <p>We are available here 24*7 for you to reach out to us incase you have any queries or any doubts you have regading our services or our website. We'll resolve all of your queries.</p>
                  <Link className="btn-theme" to="/contact">Contact With Us</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Testimonial Section */}
        <section className="section-padding testimonial-home-section home-section-5">
            <Container>
              <Row>
                <Col className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                  <HomeHeading class="home-section-5-heading" span="05. Testimonials" h2="What Clients Say About Us!" />
                </Col>
              </Row>
              <Row>
                <Col className="col-xs-12">
                  <div className="testimonial-slider">
                    <div className="testimonial-content-active text-center">
                      <Slider {...sliderSettings}>

                        <TestimonialGrid 
                          imgSrc={anshulTest}
                          para='"Your customer service is very good and your team is also very helpful and friendly. I got my website ready as expected and according to my requirements without any problem. I definitely recommend others to get their services done by here only."' 
                          name="Anshul Laddha" 
                          desig="Happy Client"  
                        />

                        <TestimonialGrid 
                          imgSrc={devenTest}
                          para='"It has been a nice experience being with your agency. You helped me to earn some side money with little efforts only. I am very happy to be a part of this community."' 
                          name="Devendra Singh" 
                          desig="Happy Client"  
                        />

                        <TestimonialGrid 
                          imgSrc={nipunTest}
                          para='"Being a part of this team is an amazing and wonderfull experience where we all learn and earn together. All of our clients also have a wonderfull experience with us and highly recommend working with us or getting services from us."' 
                          name="Nipun Goyal" 
                          desig="Team Member"  
                        />

                      </Slider>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
        </section>
      </div>
    </>
  )
}


export default Home