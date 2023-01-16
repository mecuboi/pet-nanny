import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MyBookings = (props) => {
    if (!props.length) {
        return <h3>No Bookings Yet</h3>;
      }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>My Bookings</h2>
          <div>
            <div>
              Booked Date: {props.BookedDate}
            </div>
            <div>
              Booking ID: {props.id}
            </div>
            <div>
              Price: {props.price}
            </div>
            <div>
              Booked By: {props.BookedBy.firstName} {props.BookedBy.lastName}
            </div>
            <div>
              Email: {props.BookedBy.email}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MyBookings;