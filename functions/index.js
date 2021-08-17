const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")('sk_test_51JKimYCvHWgWCHFo9PKwX6ngnex2HEu0R9pCEzdc3Bd3aPyBQQ6wudoKZrID5SCvMnGB8pWXc1WojqYWxufivj0b00W5MjKF0e');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!!", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(total),
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });

  console.log(paymentIntent.client_secret);
});

exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-134c2/us-central1/api
