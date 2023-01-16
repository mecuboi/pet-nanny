import { Container, Nav, Navbar, Modal, Tab } from 'react-bootstrap';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { Link } from 'react-router-dom';


function Navigation() {

  const [showModal, setShowModal] = useState(false);

  const getUser = localStorage.getItem('firstName');

  function showLogout() {
    if (Auth.loggedIn()) {
      return (
        <Nav.Link href="/" onClick={() => Auth.logout()}>
          Logout
        </Nav.Link>
      )
    } else {
      return (
        <Nav.Link href='#' onClick={() => setShowModal(true)}>
          Login / Signup
        </Nav.Link>
      )
    }
  }

  function showProfile() {
    if (Auth.loggedIn()) {
      return (
        <Nav.Link href='/me'>My Profile: <span className="text-primary">{getUser}</span></Nav.Link>
      )
    } else {
      return 
    }
  }



  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          
          <Navbar.Brand href="/" className="text-secondary"><img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}PetNanny!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/NannyList"> */}
                <Link to='NannyList'>Search for a Nanny</Link>
                {/* </Nav.Link> */}
              
              {showProfile()}
            </Nav>
            <Nav>
              {showLogout()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content className="">
              <Tab.Pane eventKey='login'>
                <LoginForm/>
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm/>
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
}

export default Navigation;
