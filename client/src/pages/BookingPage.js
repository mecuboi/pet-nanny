import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Button, Form, Container, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { loadStripe } from '@stripe/stripe-js';
import { QUERY_CHECKOUT } from '../utils/queries';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faStar,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";


function BookingPage() {


    const { _id } = useParams();

    const stripePromise = loadStripe('pk_test_51MQpZQCIw6RfRCJYcxVsxk9VUMvrKl3ClOMlMCl8mnKiQmUPGhR67xp8l81VLtCgdE33kV4MCOuFhB977aumnUpL00ZrDYPhrR');
    const getNanny = useQuery(QUERY_SINGLE_USER,
        {
            variables: { _id: _id }
        });

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    const [userFormData, setUserFormData] = useState(
        {
            bookedDate: new Date(),
            price: 100,
            additionalNotes: '',
        });

    const [startDate, setStartDate] = useState(new Date());

    const nannyName = getNanny.data?.user.firstName

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value })
    };

    const dateChange = (e) => {
        setStartDate(e);
        setUserFormData({ ...userFormData, date: startDate })
    };



    const handlePayment = (e) => {
        e.preventDefault()
        getCheckout({
            variables: {
                ...userFormData,
                _id: _id,
                price: 50
            },
        });

    }


    return (
        <Container className='mt-3'>
            <h3>Booking <span className='text-primary'>{nannyName}</span> as a pet nanny:</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date</Form.Label>
                    <div>
                        <DatePicker
                            id="1"
                            selected={startDate}
                            onChange={dateChange}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            name='date'
                            value={startDate}
                            isClearable
                        />
                    </div>
                    <Form.Text className="text-muted">
                        Double check your date
                    </Form.Text>
                </Form.Group>
                <fieldset disabled>
                    <Form.Group className = "mb-3">
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                name='price'
                                readOnly
                                value={userFormData.price}
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Please note that this is a fixed rate for a full day
                        </Form.Text>
                    </Form.Group>
                </fieldset>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Additional Notes</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Any allergies?"
                        onChange={handleChange}
                        name='additionalNotes'
                        value={userFormData.additionalNotes}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handlePayment}>
                    Proceed to payment
                </Button>
            </Form>
        </Container>
    );
}

export default BookingPage;