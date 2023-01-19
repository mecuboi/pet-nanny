import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat'

const MyBookings = (props) => {

  const showAdditionalNotes = () => {
    if (props.booking.additionalNotes) {
      return (
        <div className='py-1'>
              <strong>AdditionalNotes: </strong><br></br>{props.booking.additionalNotes}
            </div>
      )
    } else {
      return
    }
  }

  return (
    <Container fluid className="mb-3 px-md-4 py-md-3 border rounded w-auto mx-md-4 border">
      <Row>
        <Col>
          <div className='text-start'>
          <div className='py-1'>
              <strong>Booking Reference:</strong> <br></br>{props.id.split("",8)}
            </div>
            <div className='py-1'>
              <strong>Booked Date:</strong> <br></br>{dateFormat(props.booking.bookedDate, 'fullDate')}
            </div>
            <div className='py-1'>
              <strong>Booked By: </strong><br></br>{props.booking.bookedBy.firstName} {props.booking.bookedBy.lastName}
            </div>
            <div className='py-1'>
              <strong>Email: </strong><br></br>{props.booking.bookedBy.email}
            </div>
            {showAdditionalNotes()}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MyBookings;