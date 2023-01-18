import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MyOrders = (props) => {

  return (
    <Container fluid className="mb-3 border rounded">
      <Row>
        <Col>
          <div>
            <div className='py-1'>
              <strong>Booked Date:</strong> <br></br>{props.bookedDate}
            </div>
            <div className='py-1'>
              <strong>Booking Reference:</strong> <br></br>
              {props.id}
            </div>
            <div className='py-1'>
              <strong>Price:</strong> <br></br>${props.price}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MyOrders;