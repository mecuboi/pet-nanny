import { Container, Nav, Navbar, Modal, Tab } from 'react-bootstrap';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';


function Navigation() {

  const [showModal, setShowModal] = useState(false);

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



  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">PetNanny!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#nannylist">Search for a Nanny</Nav.Link>
              <Nav.Link href="#myprofile">Profile</Nav.Link>
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
            <Tab.Content>
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
