import React, { useState } from 'react';
import { Link, useParams, Navigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';

import Auth from '../utils/auth';


import './Profile.css';
import BookingList from './BookingList';
import OrderList from './OrderList';


const Profile = () => {
    const { profileId } = useParams();

    const { data, loading, error } = useQuery( profileId ? QUERY_SINGLE_USER : QUERY_ME,
        {
          variables: { profileId: profileId },
        }
      );

      const user = data?.me || data?.user || {};

      console.log(Auth.getProfile())

      // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
      if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
        return <Navigate to="/me" />;
      }  
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [address, setAddress] = useState('');
    // const [postcode, setPostcode] = useState('');
    // const [picture, setPicture] = useState('');
    // const [description, setDescription] = useState('');
    // const [role, setRole] = useState('');

    // setFirstName(user.firstName);
    // setLastName(user.lastName);
    // setEmail(user.email);
    // setAddress(user.address);
    // setPostcode(user.postcode);
    // setPicture(`data:image/jpeg;base64,${user.picture}`);
    // setDescription(user.description);
    // setRole(user.role);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    if (!user?.firstName) {
        return (
          <h4>
            You need to be logged in to see your profile page. Use the navigation
            links above to sign up or log in!
          </h4>
        );
      }
  
    return (
        <div>
             <div className="profile-container">
             {Auth.getProfile().data._id === profileId &&   
              <Link to="/update-user-form">
                    <button className="update-user-btn">
                        <FontAwesomeIcon icon={faCog} className="settings-icon" />
                    </button>
                </Link>}
                <img src={`data:image/jpeg;base64,${user.picture}`} alt={user.firstName + " " + user.lastName} className="profile-picture" />
                <h1 className="name">{user.firstName} {user.lastName}</h1>
                <p className="email">{user.email}</p>
                <p className="address">{user.address}, {user.postcode}</p>
                <p className="description">{user.description}</p>
            </div> 
            { user.role === 'nanny' && 
                <div className="booking-container">
                    <BookingList />
                </div>
            }
            { user.role === 'pawrent' && 
                <div className="order-container">
                    <OrderList />
                </div>
            }
        </div>
    );
};

export default Profile;