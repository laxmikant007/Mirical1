import React, { useState, useEffect } from 'react';
import PageTitle from '../../Components/UI/PageTitle';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import Input from '../../Components/UI/Input'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../actions/auth.action';
import { Redirect, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const toastId = React.useRef(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [done, setDone] = useState(false);
  
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const signupSubmit = (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, password, contact }
    dispatch(signup(userData))
  }

  useEffect(() => {
    if(auth.loading) {
      toastId.current = toast.info("❕ Loading...", {autoClose: false})
    }
    if (auth.message) {
      toast.dismiss(toastId.current);
      toast.success(`✔ ${auth.message}`)
      auth.message = ""
      setDone(true); setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setContact('');
    }
    if (auth.error) {
      toast.dismiss(toastId.current);
      toast.error(`❌ ${auth.error}`)
      auth.error = ""
    }
  }, [auth])

  if (auth.authenticate) {
    return <Redirect to={'/blogs'} />
  }

  if(done) {
    return <Redirect to={'/user/login'} />
  }

  return (
    <>
      <PageTitle title="Signup" para="Hey There! Looks Like You Have Finally Decided To Join Us And Become Part Of An Amazing Community." />
      <div className="signup-section section-padding">
        <Container >
          <Row>
            <Col lg={12}>
              <Card className="login-card">
                <Card.Body>
                  <h3 className="text-center">Signup</h3>
                  <Form onSubmit={signupSubmit}>
                    <Input
                      controlId="firstName"
                      title="First Name"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required={true}
                    />

                    <Input
                      controlId="lastName"
                      title="Last Name"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      required={true}
                    />

                    <Input
                      controlId="signupEmail"
                      title="Email address"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      message="We'll never share your email with anyone else."
                      required={true}
                    />

                    <Input
                      controlId="signupContact"
                      title="Contact"
                      type="text"
                      placeholder="Enter Contact Number"
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                    />

                    <Input
                      controlId="signupPassword"
                      title="Password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required={true}
                    />

                    <Button variant="primary" type="submit">
                      Submit
                  </Button>
                  </Form>
                  <div className="confirmDiv"> Already a user? <NavLink to="/user/login"> Login </NavLink></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}


export default Signup