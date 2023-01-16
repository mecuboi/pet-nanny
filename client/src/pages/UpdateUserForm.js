import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate  } from 'react-router-dom';
import { Form, Button, Alert, Col, Row, InputGroup } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { useEffect } from 'react';
import TestFrom from './TestForm';
import Dropzone from 'react-dropzone';

import Auth from '../utils/auth';
import TestForm from './TestForm';

const UpdateUserForm = () => {

// Prefill the form with the user's current details
const { data } = useQuery(QUERY_ME);
const user = data?.me || data?.user || {};

const [userFormData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
//   picture: '',
  postcode: ' ',
  description: '',
});

useEffect(() => {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        postcode: user.postcode,
        // picture: user.picture,
        description: user.description,
      });
  }, [data]);

    // const [img, setImg] = useState();

    // const handleOnDrop = (acceptedFiles) => {
    //     setImg(acceptedFiles[0]);
    //   };
    
    //   useEffect(() => {
    //     if (img) {
    //       setFormData((prevState) => ({
    //         ...prevState,
    //         picture: img,
    //       }));
    //     }
    //   }, [img]);

      // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

    const validateNumberOnly =(event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...userFormData, [name]: value })
    };


    const [updateUserMutation, { loading, error }] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("FORM", userFormData)

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }

        try {
            const test = await updateUserMutation({
                variables: { 
                firstName: userFormData.firstName,
                lastName: userFormData.lastName,
                email: userFormData.email,
                address: userFormData.address,
                picture: userFormData.picture,
                postcode: userFormData.postcode,
                description: userFormData.description
                }
        });
        console.log('test', test)

       return <Navigate to="me"/>
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <>
         {/* This is needed for the validation functionality above */}
        <Form className="p-5 w-100 vh-100" validated={validated} onSubmit={handleFormSubmit}>
         {/* show alert if server response is bad */}
         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Not valid inputs
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
          <Form.Control.Feedback type='invalid'>Not valid first name</Form.Control.Feedback>
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
          <Form.Control.Feedback type='invalid'>Not valid last name</Form.Control.Feedback>
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
          <Form.Control.Feedback type='invalid'>Not valid address!</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className='mt-3'>
          <Form.Label >Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Hello World'
            name='description'
            onChange={handleInputChange}
            value={userFormData.description}
            required
          />
          <Form.Control.Feedback type='invalid'>Description is required!</Form.Control.Feedback>
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
            {/* <TestForm /> */}
        </Form.Group>

        <Row className='w-75 mx-auto'>
        <Button
          
          type='submit'
          variant='primary'
          className='mt-3 w-50vh mx-auto'>
          Save
        </Button>
        
        </Row>
          {/* <Dropzone onDrop={handleOnDrop}>
            {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            )}
          </Dropzone> */}
        {/* <textarea name="description" value={userFormData.description} onChange={(e) => setFormData({ ...userFormData, description: e.target.value })} placeholder="Description"></textarea> */}
        {/* <button type="submit" variant="primary" className='mt-3'>Save</button> */}
    </Form>
    </>
    )
}

export default UpdateUserForm;