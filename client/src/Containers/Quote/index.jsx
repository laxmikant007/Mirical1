import React, { useState, useEffect } from 'react'
import './quote.css'
import PageTitle from '../../Components/UI/PageTitle'
import { Container, Col, Row } from 'react-bootstrap'
import HomeHeading from '../../Components/UI/Home/HomeHeadings'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { quoteAction } from '../../actions'


/**
* @author
* @function Quotes
**/

const Quotes = (props) => {

  const toastId = React.useRef(null);

  const dispatch = useDispatch();
  const quote = useSelector(state => state.quote)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const quoteSubmit = (e) => {
    e.preventDefault();

    const details = { name, phone, email, service, message }
    dispatch(quoteAction(details));
  }

  useEffect(() => {
    if (quote.loading) {
      toastId.current = toast.info("❕ Loading...", {autoClose: false})
    }

    if (quote.message) {
      toast.dismiss(toastId.current);
      toast.success(`✔ ${quote.message}`)
      quote.message = "";
      setName(''); setEmail(''); setPhone(''); setService(''); setMessage('');
    } else if (quote.error) {
      toast.dismiss(toastId.current);
      toast.error(`❌ ${quote.error}`)
      quote.error = "";
    }
  }, [quote, quote.loading, quote.message, quote.error])

  return(
    <>
    <PageTitle title="Service Panel" para="Hurry Get A Quote For Your Required Service." />
    <section className="quote-section section-padding">
        <Container>
          <Row>
            <Col lg={12} xs={12}>
              <HomeHeading class="quote-section-title" span="Let's get in touch" h2="Ready to hop on to our services? Let's Get A Quote Now!" p="We're available here 24*7 to provide you with the best service possible. Fill out this form with required details and get a quote ready for your required service." />

              <div className="quote-form">
                <form onSubmit={quoteSubmit}>
                  <div className="quote-form form-style">
                    <Row>
                      <Col lg={6} xs={12}>
                        <input className="form-control" type="text" placeholder="Your Name" id="quoteName" name="quoteName" value={name} onChange={e => setName(e.target.value)} required />
                        <p></p>
                      </Col>
                      <Col className="col" lg={6}>
                        <input className="form-control" type="number" placeholder="Phone (10 Digits without country code)" id="quoteNumber" name="quoteNumber" value={phone} onChange={e => setPhone(e.target.value)}  />
                        <p></p>
                      </Col>
                      <Col lg={6} xs={12}>
                        <input className="form-control" type="email" placeholder="Your Email" id="quoteEmail" name="quoteEmail" value={email} onChange={e => setEmail(e.target.value)} required />
                        <p></p>
                      </Col>
                      <Col className="col" lg={6}>
                        <select className="form-control" name="quoteSubject" value={service} onChange={e => setService(e.target.value)} required>
                          <option defaultValue disabled value="" selected>Select Service</option>
                          <option value="Web Development"> Web Development </option>
                          <option value="Seo Optimization"> Seo Optimization </option>
                          <option value="Finance Solutions"> Finance Solutions </option>
                          <option value="Digital Marketing"> Digital Marketing </option>
                          <option value="Earning Opportunity"> Earning Opportunity </option>
                          <option value="OTT Accounts"> OTT Accounts </option>
                        </select>
                        <p></p>
                      </Col>
                      <Col xs={12} sm={12} >
                        <textarea className="quote-textarea form-control" placeholder="Description Of Your Requirements" name="quoteDesc" minLength="20" spellCheck="false" style={{ marginTop: "0px", marginBottom: "0px", height: "249px" }} value={message} onChange={e => setMessage(e.target.value)} required />
                        <p></p>
                      </Col>
                      <Col xs={12}>
                        <button type="submit" className="btn-theme">
                          Get A Quote
                      </button>
                      </Col>
                    </Row>

                  </div>
                </form>
              </div>

            </Col>
          </Row>
        </Container>
      </section>
    </>
   )
  }


export default Quotes