import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';

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
  const amount = useSelector(selectCartTotal);


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
        id,
        amount: amount * 100,
      })

      // const clientSecret = response.paymentIntent.client_secret;

      // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: currentUser ? currentUser.displayName : 'Prashant Gupta',
      //     },
      //   },
      // });

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
          <button>Pay Now @ 4000003560000008</button>
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