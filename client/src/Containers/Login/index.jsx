import React, { useEffect, useState } from 'react'
import PageTitle from '../../Components/UI/PageTitle'
import './Login.css'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import Input from '../../Components/UI/Input'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../actions/auth.action'
import { NavLink, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';

/**
* @author
* @function Login
**/

const Login = (props) => {

  const toastId = React.useRef(null);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();

    const userData = { user, password };

    dispatch(login(userData))
  }

  useEffect(() => {
    if(auth.loading) {
      toastId.current = toast.info("❕ Loading...", {autoClose: false})
    }
    if(auth.authenticate) {
      toast.dismiss(toastId.current);
      toast.success("✔ Logged In Succesfully!")
    }
    if(auth.error) {
      toast.dismiss(toastId.current);
      toast.error(`❌ ${auth.error}`)
      auth.error = "";
    }
  },[auth])

  if(auth.authenticate) {
    return <Redirect to={"/blogs"} />
  }

  return (
    <>
      <PageTitle title="Login" para="Hey There! Good To See You're Visiting Us Back. Login and get back on the amazing Journey." />
      <div className="login-section section-padding">
        <Container >
          <Row>
            <Col lg={12}>
              <Card className="login-card">
                <Card.Body>
                  <h3 className="text-center">Login</h3>
                  <Form onSubmit={loginSubmit}>
                    <Input
                      controlId="loginEmail"
                      title="Email/Phone"
                      type="text" 
                      placeholder="Enter Your Email / Phone" 
                      value={user} 
                      onChange = {e => setUser(e.target.value)}
                    />

                    <Input
                      controlId="loginPassword"
                      title="Password"
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                      Submit
                  </Button>
                  </Form>
                 <div className="confirmDiv"> Not a user yet? <NavLink to="/user/signup"> Sign up </NavLink></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}


export default Login