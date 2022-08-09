import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import footCloud from '../../img/footer-shape.webp'
import './Footer.css'
import { useSelector, useDispatch } from 'react-redux'
import { newsletter } from '../../actions/newsletter.action'
import { toast } from 'react-toastify';

/**
* @author
* @function Footer
**/

const Footer = (props) => {
    // 2-D Array for Footer Icons having links and icon names
    const FooterIconListItems = [
        ["https://instagram.com/the_miracle_solutions", "fa-facebook-f"], ["https://instagram.com/the_miracle_solutions", "fa-twitter"],
        ["https://instagram.com/the_miracle_solutions", "fa-instagram"], ["https://instagram.com/the_miracle_solutions", "fa-linkedin-in"]
    ]

    // 2-D Array for Footer Company List having links and Respective Name
    const FooterCompanyList = [
        ["/about", "About us"], ["/service", "Our services"], ["/contact", "Contact us"], ["/team", "Meet team"]
    ]

    // 2-D Array for Footer Company List 2 having links and Respective Name
    const FooterCompanyList2 = [
        ["/terms", "Terms"], ["/policy", "Privacy Policy"], ["/testimonial", "Testimonials"], ["/faq", "FAQ"]
    ]

    // 2-D Array for Footer Service List  having links and Service Name
    const FooterServiceList = [
        ["http://softcopy.tech", "Notes"], ["/service", "GST/ITR Filing"], ["/service", "Web Development"], ["https://earnloots.blogspot.com", "Earning Tricks"] 
    ]

    //  Function To Render Icon List
    const renderIconListItems = () => {
        return (  FooterIconListItems.map((val, index) => { return <li key={index}> <a href={val[0]} target="_blank" rel="noopener noreferrer"> <i className={`fab ${val[1]}`} aria-hidden="true"></i> </a> </li> }) )
    }

    // Function To Render Company List
    const renderCompanyList = () => {
        return ( FooterCompanyList.map((val, index) => { return ( <li key={index}> <Link to={val[0]}> {val[1]} </Link> </li> ) }) )
    }

    // Function To Render Company List 2
    const renderCompanyList2 = () => {
        return ( FooterCompanyList2.map((val, index) => { return ( <li key={index}> <Link to={val[0]}> {val[1]} </Link> </li> ) }) )
    }

    // Function To Render Service List 
    const renderServiceList = () => {
        return ( FooterServiceList.map((val, index) => { return ( <li key={index}> <a href={val[0]} target="_blank" rel="noopener noreferrer"> {val[1]} </a> </li> ) }) )
    }

    const toastId = React.useRef(null);

    const [email, setEmail] = useState('')
    const news = useSelector(state => state.news)

    const dispatch = useDispatch();

    const onNewsSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        dispatch(newsletter({email}));
    }

    useEffect(() => {
        if(news.loading) {
            toastId.current = toast.info("❕ Loading...", {autoClose: false})
        }
        if(news.message) {
            toast.dismiss(toastId.current);
            toast.success(`✔ ${news.message}`)
            news.message = "";
        } else if(news.error) {
            toast.dismiss(toastId.current);
            toast.warning(`⚠ ${news.error || news.message}`)
            news.error = "";
        }
    }, [news, news.message, news.error, news.loading])

    return (
        <>
            <footer fixed="bottom" className="site-footer" style={{ background: `url(${footCloud}) bottom/cover no-repeat local` }}>
                <div className="upper-footer">
                    <Container>
                        <Row>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <div className="footer-about-section">
                                    <h3 style={{ marginTop: '-12px' }} className="site-brand widget-title">Miracle<span style={{ color: '#FC6E36', fontSize: '2.5rem' }}>.</span></h3>
                                    <p>Anand International College of Engineering, Near Kanota, Agra Road, Jaipur, Rajasthan 303012</p>
                                    <div className="social-icons">
                                        <ul>
                                            {renderIconListItems()}
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <div className="widget footer-company-section">
                                    <h3 className="widget-title">Company</h3>
                                    <ul>
                                        {renderCompanyList()}
                                    </ul>
                                    <ul>
                                        {renderCompanyList2()}
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <div className="widget footer-service-section">
                                    <h3 className="widget-title">Services</h3>
                                    <ul>
                                      {renderServiceList()}
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <div className="widget footer-newsletter-section">
                                    <h3 className="widget-title">Newsletter</h3>
                                    <p>
                                        You will be notified when somthing new will be appear.
                                    </p>
                                    <form onSubmit={onNewsSubmit}>
                                        <div className="newsletter-input-div">
                                            <input type="email" className="form-control newsletter-input" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} required />
                                            <button type="submit">
                                                <i className="far fa-envelope"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="lower-footer">
                    <Container>
                        <Row>
                            <div className="seperator"></div>
                            <Col xs={12}>
                                <p className="copyright">
                                    Copyright © 2021 <span style={{color:"#FC6E36"}}> The Miracle Solutions. </span> All rights reserved.
                               </p>
                                <div className="extra-links">
                                    <ul>
                                        <li><Link to="/policy">Privacy Policy</Link></li>
                                        <li><Link to="/terms">Terms</Link></li>
                                        <li><Link to="/about">About Us</Link></li>
                                        {/* <li><Link to="/faq">FAQ</Link></li> */}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    )
}


export default Footer