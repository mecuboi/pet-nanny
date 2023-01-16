import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MyOrders = (props) => {
    if (!props.length) {
        return <h3>No Orders Yet</h3>;
      }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>My Orders</h2>
          <div>
            <div>
              Booked Date: {props.bookings.BookedDate}
            </div>
            <div>
              Booking ID: {props.id}
            </div>
            <div>
              Price: {props.bookings.price}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MyOrders;