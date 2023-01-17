import React, { useState } from 'react';
import { Link, useParams, Navigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';

import { Row, Button, Card } from 'react-bootstrap';
import '@fortawesome/react-fontawesome';

import Auth from '../utils/auth';


import './Profile.css';
import BookingList from './BookingList';
import OrderList from './OrderList';


const Nannyprofile = () => {
    const { _id } = useParams();

    const { data, loading, error } = useQuery( QUERY_SINGLE_USER,
        {
          variables: { _id: _id },
        }
      );
      console.log(data)

      const user = data?.user || {};
      console.log(user)

    if (loading) return <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            className="animation"
            alt="loading"
             />;
    if (error) {
        console.log(error)
        return <p>Error</p>};
  
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

export default Nannyprofile;