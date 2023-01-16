import MyBookings from './MyBookings';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const OrderList = (props) => {
  const { loading, data, error } = useQuery(GET_ME);
  let orders;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data) {
     orders = data.me.orders
  }

    return (
      <div>
        {orders.map(booking => (
          <MyBookings 
            key={booking.id}
            BookedDate={booking.bookings.bookedDate} 
            id={booking.id} 
            price={booking.bookings.price} 
          />
        ))}
      </div>
    )
  }

  export default OrderList;