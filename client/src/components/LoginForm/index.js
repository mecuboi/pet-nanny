import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations'
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom'

const LoginForm = () => {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN)
  const [toMe, setToMe ] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const {data} = await login({
        variables: {...userFormData}
      })
      Auth.login(data.login.token, data.login.user.firstName);
      window.location.href = '/me'

      // setToMe(true)
      
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  }

  // if (toMe) {
  //   return (<Navigate to='me'/>)
  // }

  return (
    <Form className="w-100 w-md-75" validated={validated} onSubmit={handleSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>
      <Button 
      variant="primary" 
      type="submit" 
      disabled={!(userFormData.email && userFormData.password)}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm;