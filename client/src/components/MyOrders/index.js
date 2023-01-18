import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat'

const MyOrders = (props) => {

  return (
    <Container fluid className="mb-3 px-md-4 py-md-3 border rounded">
      <Row>
        <Col>
          <div>
          <div className='py-1'>
              <strong>Booking Reference:</strong> <br></br>
              {props.id.split("",8)}
            </div>
            <div className='py-1'>
              <strong>Booked Date:</strong> <br></br>
              {dateFormat(props.bookedDate, 'fullDate')}
            </div>
            <div className='py-1'>
              <strong>Fee paid:</strong> <br></br>${props.price}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MyOrders;