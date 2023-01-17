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
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Form className="w-100 w-md-75" onSubmit={handleFormSubmit}>
    <Form.Group className="mb-3">
    <Form.Label>Upload a profile picture!</Form.Label>
    <Form.Control
    type="file"
    name='picture'
    required
    />
    <Form.Control.Feedback type='invalid'>Invalid File!</Form.Control.Feedback>
    </Form.Group>
    <Button type="submit">Upload</Button>
    </Form>
    </div>
)
};

export default UploadImageForm;