import MyOrders from '../components/MyOrders';

import { useQuery } from '@apollo/client';
import { QUERY_ME , QUERY_ALL_NANNIES} from '../utils/queries';

const OrderList = (props) => {
  const { loading, data, error } = useQuery(QUERY_ME);

  console.log(data)

  const arrayOfOrders = data?.me.orders;

  console.log(arrayOfOrders)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

    return (
      (arrayOfOrders ? 
      <div className = "footermarginbottom">
           <h3 className = "text-secondary m-3 text-center"> <strong>My Orders</strong></h3>
        {arrayOfOrders.map((order) => (
          <MyOrders 
            key={order.bookings._id}
            bookedDate= "22-10-2023" 
            id={order._id} 
            price="100" 
          />
        ))}
      </div> :

       <p className="text-secondary ms-3 p-3 text-center">No Orders yet</p>
      )
    )
  }

  export default OrderList;

  