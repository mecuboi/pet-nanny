import React, { useState } from 'react';
import { Form, Button, Alert, Col, Row, InputGroup } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Link, Navigate } from "react-router-dom";

const SignupForm = () => {
  //set initial form state
  const [userFormData, setUserFormData] = useState(
    {
      firstName: '',
      lastName: '',
      address: '',
      postcode: '',
      role: 'Pawrent',
      email: '',
      password: ''
    });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value })
  };

  const validateNumberOnly =(event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: {...userFormData},
      });

      Auth.login(data.addUser.token, data.addUser.user.firstName);
      // window.location.href = "/me"
      

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      firstName: '',
      lastName: '',
      address: '',
      postcode: '',
      role: 'Pawrent',
      email: '',
      password: ''
    });

  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form className="w-100" validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group >
          <Form.Label >First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your First Name'
            name='firstName'
            onChange={handleInputChange}
            value={userFormData.firstName}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter your first name!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label >Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Last Name'
            name='lastName'
            onChange={handleInputChange}
            value={userFormData.lastName}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter your last name!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label >Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='29 Example Street'
            name='address'
            onChange={handleInputChange}
            value={userFormData.address}
            required
          />
          <Form.Control.Feedback type='invalid'>Address is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label >Postcode</Form.Label>
          <Form.Control
            type='text'
            placeholder='e.g. 2000'
            name='postcode'
            onChange={handleInputChange}
            onKeyPress={validateNumberOnly}
            value={userFormData.postcode}
            required
          />
          <Form.Control.Feedback type='invalid'>Postcode is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label >Role</Form.Label>
          <Form.Select
          name='role'
          onChange={handleInputChange}
          value={userFormData.role}
          required>
            <option>Pawrent</option>
            <option>Nanny</option>
          </Form.Select>
          
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='sarah@example.com'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Label className="text-secondary small">Password must have a minimum length of 5 characters</Form.Label>
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          
          type='submit'
          variant='primary'
          className='mt-3'>
          Submit
        </Button>
      </Form>
    </>
  );

  
};

export default SignupForm;
