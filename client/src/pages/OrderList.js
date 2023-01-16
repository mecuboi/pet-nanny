import MyOrders from '../components/MyOrders';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const OrderList = (props) => {
  const { loading, data, error } = useQuery(QUERY_ME);

  const orders = data?.me?.orders || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

    return (
      <div>
        {orders.map(booking => (
          <MyOrders 
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