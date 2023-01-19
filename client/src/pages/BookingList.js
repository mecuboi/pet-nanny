import MyBookings from '../components/MyBookings';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';

const BookingList = (props) => {
  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, 
    {
      variables: {_id: props.id}
    });
  const bookings = data?.user?.bookings || [];

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

    return (
        (bookings.length ?
        <div className="footermarginbottom">
          <h4 className = "text-secondary m-3 text-center"> <strong>My Bookings</strong></h4>
        {bookings.map(booking => (
          <MyBookings 
            key={booking._id}
            bookedDate={booking.bookedDate} 
            id={booking._id} 
            price={booking.price} 
            bookedBy={booking.bookedBy}
            // bookedBy={{ 
            //   _id: booking.bookedBy._id, 
            //   firstName: booking.bookedBy.firstName, 
            //   lastName: booking.bookedBy.lastName, 
            //   email: booking.bookedBy.email 
            // }} 
          />
        ))}
      </div>
        :
        <p>No Bookings</p>
      
    )
    )
  }

  export default BookingList;