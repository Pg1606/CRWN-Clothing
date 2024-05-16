const stripe = require("stripe")("sk_test_51PFy2gSDGZWWYY6XQI4iZedUxYZ4woa7EjkRcxIQDbpP9M8BuWzsP322klYz8v6RsiVpY1vVoRWZ0Bt4Y6xnakfA00VJPQwoYp");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const { cartItems } = body;

  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.imageUrl]
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:8888/success",
    cancel_url: "http://localhost:8888/cancel",
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};