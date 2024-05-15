// import { useState } from "react";
// import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// //import { useSelector } from "react-redux";

// //import { selectCartTotal } from '../../store/cart/cart.selector';

// import { BUTTON_TYPE_CLASSES } from "../button/button.component";
// import { stripePromise } from '../../utils/stripe/stripe.utils';

// import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

// const options = {
//   mode: 'payment',
//   currency: 'usd',
//   amount: 1099,
// };

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   //const amount = useSelector(selectCartTotal);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   const paymentHandler = async (e) => {
//     e.preventDefault();

//     if(!stripe || !elements) {
//       return;
//     }

//     setIsProcessingPayment(true);

//     const {error: submitError} = await elements.submit();
//     if (submitError) {
//       alert(submitError);
//       return;
//     }

//     const response = await fetch('/create-intent', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     const {client_secret: { clientSecret }} = await response.json();

//     console.log(clientSecret);

//     const {error} = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: 'https://example.com/order/123/complete',
//       },
//     });

//     setIsProcessingPayment(false);

//     if(error) {
//       alert(error);
//     }
//   };

//   return (
//     <PaymentFormContainer>
//       <FormContainer onSubmit={paymentHandler}>
//         <h2>Credit Card Payment: </h2>
//         <PaymentElement />
//         <PaymentButton
//           isLoading={isProcessingPayment}
//           buttonType={BUTTON_TYPE_CLASSES.inverted}
//         >
//           Pay Now
//         </PaymentButton>
//       </FormContainer>
//     </PaymentFormContainer>
//   );
// };

// const StripeContainer = () => {
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <PaymentForm />
//     </Elements>
//   )
// }

// export default StripeContainer;

//export default PaymentForm;

import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from 'react';
import { stripePromise } from '../../utils/stripe/stripe.utils';

import Success from '../payment/success';

import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export function PaymentForm() {
  const [success, setSuccess ] = useState(false);
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    });

  if(!error) {
    try {
      const {id} = paymentMethod
      const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id
        })

      if(response.data.success) {
        console.log("Successful payment")
        setSuccess(true)
      }
      } catch (error) {
          console.log("Error", error)
      }
    } else {
        console.log(error.message)
    }
  }

  return (
    <PaymentFormContainer>
        <h2>Credit Card Payment: </h2>
        {!success ? 
        <FormContainer onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <button>Pay Now</button>
        </FormContainer>
        :
        <div>
          <Success />
        </div>
        }
    </PaymentFormContainer>
  )
}

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}

export default StripeContainer;