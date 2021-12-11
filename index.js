const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51Js7TjSBeewhZlr5CbBUXkL7C0guL06F5mPxkbpNzgCbkFzWK5pDsUi13jIB3ekji1UjrL4gBy6Is9AuFnPL0LbW00vuhX33Kc"
)


//API

//App Config

const app = express();


//Middlewares
app.use(cors({origin:true}));
app.use(express.json());


//Api Routes
app.get("/" , (req,res) => {
    res.status(200).send("Hello World");
});

app.post("/payments/create" , async (req,res) => {
    const total = req.query.total;
    console.log("Payment Request Recieved !!! ",total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency:"usd"

    });

    //OK-created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


//Listen command
//run expresss server on cloud function
exports.api = functions.https.onRequest(app);
