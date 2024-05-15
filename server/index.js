const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const bodyParser = require("body-parser")
const cors = require("cors")
const { url } = require("inspector")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Crown Clothing Company",
			payment_method: id,
			confirm: true,
			return_url: "http://localhost:3000/success"
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment Successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})