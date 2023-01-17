import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Col, Row, InputGroup } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

function UploadImageForm() {
    const navigate = useNavigate();

const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

const { data } = useQuery(QUERY_ME);
const user = data?.me || data?.user || {};

console.log(user._id)

const handleFormSubmit = async (event) => {
    event.preventDefault();
    // const token = localStorage.getItem("token");    

    // Get the file from the input
    const file = event.target.picture.files[0];

    // Read the file into a base64 encoded string
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const picture = reader.result;

        try {
            const res = await axios.post("/upload", {picture, userId: user._id})
        } catch (err) {
            console.log(err);
        }
        return window.location.replace('/me')
    };
};

return (
    <div className="bg-white d-flex justify-content-center align-items-center vh-100">
    <Form className="w-50 w-md-75" onSubmit={handleFormSubmit}>
    <Form.Group className="mb-3">
    <Form.Label><h3 className="text-center">Upload a profile picture!</h3></Form.Label>
    <Form.Control
    type="file"
    name='picture'
    required
    className="py-5"
    />
    <Form.Control.Feedback type='invalid'>Invalid File!</Form.Control.Feedback>
    </Form.Group>
    <div className='d-flex flex-end md-mx-3'>
    <Button type="submit" className='w-25 md-w-25 my-1'>Upload</Button>
    </div>
    </Form>
    </div>
)
};

export default UploadImageForm;