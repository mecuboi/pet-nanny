import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button, Form, Container } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faStar,
    faMagnifyingGlass,
  } from "@fortawesome/free-solid-svg-icons";
  import "@fortawesome/react-fontawesome";


function BookingPage() {

        const stripePromise = loadStripe('pk_test_51MQpZQCIw6RfRCJYcxVsxk9VUMvrKl3ClOMlMCl8mnKiQmUPGhR67xp8l81VLtCgdE33kV4MCOuFhB977aumnUpL00ZrDYPhrR');
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const [userFormData, setUserFormData] = useState(
        {
            date: '',
            additionalNotes: '',
        });
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (e) => {
      
        setStartDate(e);
    };

    const handlePayment = () => {
        stripePromise.then((res) => {
          res.redirectToCheckout({sessionId: data.checkout.session});
        })
      }

    return (
        <Container className='mt-3'>
            <h3>Booking {}</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date</Form.Label>
                    <div>
                            <DatePicker
                                id="1"
                                selected={startDate}
                                onChange={handleChange}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                            />
                    </div>
                    <Form.Text className="text-muted">
                        Double check your date
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Additional Notes</Form.Label>
                    <Form.Control type="text" placeholder="Any allergies?" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handlePayment}>
                    Proceed to payment
                </Button>
            </Form>
        </Container>
    );
}

export default BookingPage;