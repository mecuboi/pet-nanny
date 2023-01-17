import React, { useState } from 'react';
import { Link, useParams, Navigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons';
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

      console.log('picture', user.bookings)

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
        <div className="w-auto vh-100 bg-light">
         <Card className="w-auto vh-100 bg-white">
            <Card.Header className="bg-secondary">
                <Card.Title>
                {user.firstName + " " + user.lastName}
                </Card.Title>
            </Card.Header>
      <Card.Body>
      <img className="rounded-circle" variant='top' src={user.picture} alt="Card image cap" />
        <div id="description-container" className='py-5'>
        <Card.Footer>
          {user.description}
        </Card.Footer>
        </div>
        <div id="about-title-container" className='text-left'>
        <Card.Title>About </Card.Title>
        </div>
        <div id="about-container" className='py-1 pb-5'>
        <Card.Footer>
    <Row className="align-items-center">
        <p xs={6} className="text-center">{user.email}</p>
    </Row>
    <Row className="align-items-center">
        <p xs={6} className="text-right">{user.address}, {user.postcode}</p>
    </Row>
    </Card.Footer>
        </div>
        {Auth.getProfile().data._id === user._id &&   
            <Link to="/update-user-form">
                <Button variant="primary">Edit Profile</Button>
            </Link>
        }
        { user.role === 'Nanny' && Auth.getProfile().data._id === !user._id &&
        <Button variant="secondary">Book</Button>
        }
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
             {/* <div className="profile-container d-flex flex-column align-items-center">
    {Auth.getProfile().data._id === user._id &&   
        <div className="btn-group">
            <Link to="/update-user-form">
                <i className="btn btn-secondary">
                    <FontAwesomeIcon icon={faCog} className="settings-icon" /> Update
                </i>
            </Link>
            <i className="btn btn-danger">
                <FontAwesomeIcon icon={faTrash} className="delete-icon" /> Delete
            </i>
        </div>
    }
    <div className="image-container">
        <img src='https://picsum.photos/200/300' alt={user.firstName + " " + user.lastName} className="profile-picture rounded-circle" />
    </div>
    <div className="info-container d-flex flex-column align-items-center">
        <h1 className="name text-center">{user.firstName} {user.lastName}</h1>
        <div className="other-info-container">
            <p className="email text-center">{user.email}</p>
            <p className="address text-center">{user.address}, {user.postcode}</p>
            <p className="description text-center">{user.description}</p>
        </div>
    </div>
    </div> */}
            { user.role === 'Nanny' && 
                <div className="booking-container">
                    {/* <BookingList /> */}
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