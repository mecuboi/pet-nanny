import React, { useState, useContext } from 'react';
import { useUserIdContext } from '../utils/GlobalState';
// import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import './Profile.css';
    
const Profile = async () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');

    const { data, loading, error } = useQuery(QUERY_USER, {
        variables: {id: useUserIdContext}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const user = data.user;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setAddress(user.address);
    setPostcode(user.postcode);
    setPicture(user.picture);
    setDescription(user.description);
    
    return (
         <div className="profile-container">
            <img src={picture} alt={firstName + " " + lastName} className="profile-picture" />
            <h1 className="name">{firstName} {lastName}</h1>
            <p className="email">{email}</p>
            <p className="address">{address}, {postcode}</p>
            <p className="description">{description}</p>
        </div> 
    );
};

export default Profile;