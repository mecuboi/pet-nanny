import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';

import Auth from '../utils/auth';

const UpdateUserForm = () => {
const [updateUserMutation, { loading, error }] = useMutation(UPDATE_USER);

const { data } = useQuery(QUERY_ME);
const user = data?.me || data?.user || {};

const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  picture: '',
  description: '',
});

useEffect(() => {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        picture: user.picture,
        description: user.description,
      });
  }, [data]);

    const [img, setImg] = useState();

    const handleOnDrop = (acceptedFiles) => {
        setImg(acceptedFiles[0]);
      };
    
      useEffect(() => {
        if (img) {
          setFormData((prevState) => ({
            ...prevState,
            picture: img,
          }));
        }
      }, [img]);
    
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await updateUserMutation({
                variables: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                address: formData.address,
                picture: formData.picture,
                description: formData.description
                }
        });
        } catch (err) {
            console.log(err);
        }
    };

    return(
    <form onSubmit={updateUser}>
        <input type="text" name="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="First Name" />
        <input type="text" name="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Last Name" />
        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
        <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Address" />
          {/* <Dropzone onDrop={handleOnDrop}>
            {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            )}
          </Dropzone> */}
        <textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description"></textarea>
        <button type="submit">Save</button>
    </form>
    )
}

export default UpdateUserForm;