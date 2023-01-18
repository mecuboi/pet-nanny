import MyOrders from '../components/MyOrders';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const OrderList = (props) => {
  const { loading, data, error } = useQuery(QUERY_ME);

  console.log(data)

  const orders = data?.me?.orders || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

    return (
      (orders ? 
      <p>No Orders</p>
        :
      <div>
        {orders.map((order) => (
          <MyOrders 
            key={order.id}
            BookedDate={order.bookings.bookedDate} 
            id={order.id} 
            price={order.bookings.price} 
          />
        ))}
      </div>
      )
    )
  }

  export default OrderList;