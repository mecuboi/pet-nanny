import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import{ Link } from 'react-router-dom';

import { QUERY_CHECKOUT } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';



function Success() {
   
  return (
    <>
 
      <h2 className="m-5 text-center text-secondary">Payment successful</h2>
      <div className="d-flex justify-content-center">
        <Link to='/' className='customhomebutton'>
          <Button variant="primary" className="m-2 mb-5 p-3">Back to Home</Button>{' '}
        </Link>
      </div>

    </>
  );
}

export default Success;

