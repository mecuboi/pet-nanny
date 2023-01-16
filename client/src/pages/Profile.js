import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';

import './Profile.css';
import BookingList from './BookingList';
import OrderList from './OrderList';


const Profile = () => {
    const { data, loading, error } = useQuery(GET_ME)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState('');
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    if (data) {
        const user = data.user;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setAddress(user.address);
        setPostcode(user.postcode);
        setPicture(`data:image/jpeg;base64,${user.picture}`);
        setDescription(user.description);
        setRole(user.role);
    }

  
    return (
        <div>
             <div className="profile-container">
             <Link to="/update-user-form">
                    <button className="update-user-btn">
                        <FontAwesomeIcon icon={faCog} className="settings-icon" />
                    </button>
                </Link>
                <img src={picture} alt={firstName + " " + lastName} className="profile-picture" />
                <h1 className="name">{firstName} {lastName}</h1>
                <p className="email">{email}</p>
                <p className="address">{address}, {postcode}</p>
                <p className="description">{description}</p>
            </div> 
            { role === 'nanny' && 
                <div className="booking-container">
                    <BookingList />
                </div>
            }
            { role === 'pawrent' && 
                <div className="order-container">
                    <OrderList />
                </div>
            }
        </div>
    );
};

export default Profile;