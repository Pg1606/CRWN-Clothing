import { loadStripe } from "@stripe/stripe-js";

import { PaymentFormContainer, PaymentButton } from './payment-form.styles';
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

var stripe = await loadStripe(
  "pk_test_51PFy2gSDGZWWYY6XG8K8EneS97Y5WFDGAK6yeXFzH4s4KsMqgen3yLenj6IXLlkIu0kIPFZexpfEf8MT3YXvhO8a00NoDdAXbh"
);

const PaymentForm = () => {
  //const amount = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  const paymentHandler = () => {
      fetch("/.netlify/functions/stripe", {
      method: "POST",
      body: JSON.stringify({cartItems})
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      })
    };

  return (
    <PaymentFormContainer>
      <h2>Credit Card Payment</h2> 
      <PaymentButton onClick={paymentHandler}>Pay Now</PaymentButton>
    </PaymentFormContainer>
  )
}

export default PaymentForm;