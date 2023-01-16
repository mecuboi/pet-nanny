// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51MQpZQCIw6RfRCJYcxVsxk9VUMvrKl3ClOMlMCl8mnKiQmUPGhR67xp8l81VLtCgdE33kV4MCOuFhB977aumnUpL00ZrDYPhrR');

// export default function Stripetest() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: '{{CLIENT_SECRET}}',
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };