import React, { useState, useContext } from 'react';
import { useUserIdContext } from '../utils/GlobalState';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';

import './Profile.css';

// function Profile() {
//     return (
//                  <div className="profile-container">
//                    <div className="edit-button-container">
//                         <button className="edit-button">
//                         <img src="path/to/favicon.ico" alt="Edit button" className="edit-icon" />
//                         </button>
//                     </div>
//                     <img src="https://picsum.photos/200/300" alt="Chicken" className="profile-picture" />
//                     <h1 className="name">Bob Legend</h1>
//                     <p className="email">bobby1209@gmail.com</p>
//                     <p className="address">11 Chicken St, New York, 50000</p>
//                     <p className="description">HI I AM BOB. I AM A HUMAN LOREM LOREM LOREM  LOREM LOREM LOREM  LOREM LOREM LOREM LOREM LOREM LOREM</p>
//                     <div className="button-container">
//                         <button>Message</button>
//                         <button>Book</button>
//                     </div>
//                 </div> 
//             );
// }
    
const Profile = async () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');

    const { data, loading, error } = useQuery(QUERY_SINGLE_USER, {
        variables: {userId: useUserIdContext}
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