import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions'
import { toast } from 'react-toastify';

/**
* @author
* @function Navbar
**/

const NavbarComp = ({ match }) => {
 
  const [nav, setNav] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const changeNavColor = () => {
    if(window.scrollY >= 100 || (window.location.pathname.includes('/blogs/user/') && window.scrollY >= 0 )) {
      setNav(true)
    } else {
      setNav(false)
    }
  }

  window.addEventListener('scroll', changeNavColor);

  const logoutBtn = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if(window.location.pathname.includes('/blogs/user/')) {
      setNav(true)
    } else {
      setNav(false)
    }

    if(auth.success) {
      toast.success("✔ You are logged out successfully!!");
      auth.success = false;
      auth.loading = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth, window.location.pathname])

  const renderLoggedinLinks = () => {
    return (
      <Nav className="ml-auto"> 
       {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
       <a className="navLink" onClick={logoutBtn} style={{cursor: "pointer"}}>Logout</a>
      </Nav>
    )
  }

  const renderNonLoggedinLinks = () => {
    return (
      <Nav className="ml-auto"> 
       <NavLink to="/user/login" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>Login</NavLink>
       <NavLink to="/user/signup" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>Join Us</NavLink>
      </Nav>
    )
  }

  return (
    <>
    <Navbar expanded={expanded} className={nav ? 'navDiv navbar-scroll-color' : 'navDiv'} fixed="top" expand="lg">
        <Container fluid>
        <NavLink to="/" className="navbar-brand site-brand">Miracle<span style={{color:'#FC6E36',fontSize:'2.5rem'}}>.</span> </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setTimeout(() => {setExpanded(expanded ? false : "expanded")}, 200)}  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink exact to="/" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>Home</NavLink>
            <NavLink to="/about" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>About Us</NavLink>
            <NavLink to="/service" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>Services</NavLink>
            <NavLink to="/blogs" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>Blogs</NavLink>
            <NavLink to="/contact" className="navLink" activeClassName="activeNavLink" onClick={() => setTimeout(() => {setExpanded(false)}, 200)}>Contact Us</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
            {auth.authenticate ? renderLoggedinLinks() : renderNonLoggedinLinks() }
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}


export default NavbarComp