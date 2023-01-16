import React, { useState } from 'react';
import { Link, useParams, Navigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';

import { Container, Row, Col } from 'react-bootstrap';
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

   console.log("GETPROFILE", Auth.getProfile())

      const user = data?.me || data?.user || {};

      // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
      if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
        return <Navigate to="/me" />;
      }  

    if (loading) return <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            className="animation"
            alt="loading"
             />;
    if (error) return <p>Error</p>;

    if (!user?.firstName) {
        return (
            <Container fluid className="p-5 vh-100 d-grid place-items-center">
              <h4 className="text-center">
                You need to be logged in to see your profile page. Use the navigation
                links above to sign up or log in!
              </h4>
            </Container>
          );
      }
  
    return (

        <div>
             <div className="profile-container">
             {Auth.getProfile().data._id === user._id &&   
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
            { user.role === 'Nanny' && 
                <div className="booking-container">
                    <BookingList />
                </div>
            }
            { user.role === 'Pawrent' && 
                <div className="order-container">
                    <OrderList />
                </div>
            }
        </div>
    );
};

export default Profile;