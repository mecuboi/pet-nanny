import MyOrders from '../components/MyOrders';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const OrderList = (props) => {
  const { loading, data, error } = useQuery(QUERY_ME);

  const arrayOfOrders = data?.me.orders;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

    return (
      (arrayOfOrders.length ? 
      <div className = "footermarginbottom">
           <h3 className = "text-secondary m-3 text-center"> <strong>My Orders</strong></h3>
        {arrayOfOrders.map((order) => (
          <MyOrders 
            key={order.bookings._id}
            bookedDate= {order.bookings.bookedDate}
            id={order._id} 
            price={order.bookings.price} 
          />
        ))}
      </div> :

       <p className="text-secondary ms-3 p-3 text-center">No Orders yet</p>
      )
    )
  }

  export default OrderList;

  