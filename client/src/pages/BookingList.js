import MyBookings from './MyBookings';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const BookingList = (props) => {
  const { loading, data, error } = useQuery(GET_ME);
  let bookings;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data) {
     bookings = data.me.bookings
  }

    return (
      <div>
        {bookings.map(booking => (
          <MyBookings 
            key={booking.id}
            BookedDate={booking.bookedDate} 
            id={booking.id} 
            price={booking.price} 
            BookedBy={{ 
              id: booking.bookedBy.id, 
              firstName: booking.bookedBy.firstName, 
              lastName: booking.bookedBy.lastName, 
              email: booking.bookedBy.email 
            }} 
          />
        ))}
      </div>
    )
  }

  export default BookingList;