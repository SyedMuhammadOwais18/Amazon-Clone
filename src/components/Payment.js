import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { db } from "../firebase";

function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setprocessing] = useState("");
  const [succeeded, setsucceeded] = useState(false);
  const [clientSecret, setclientSecret] = useState(true);
  //important snippet
  useEffect(() => {
    //generate a special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in currency subunits
        // * 100 to convert dollar into cents(check the same scene for rupees also))
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setclientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setprocessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        //with the help of client secret stripe knows how much you charge your customer
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      //return by stripe
      .then(({ paymentIntent }) => {
          console.log(paymentIntent);
        // db.collection("users")
        //   .doc(user?.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });
        setsucceeded(true);
        setError(null);
        setprocessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
    //paymentIntent = paymentConfirmation
  };

  const handleChange = (event) => {
    //listen for changes in the card element
    //and display any errors as the customer type their card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items </Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>B-76 Bahria Town</p>
            <p>Malir,Palistan</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment method</h3>
          </div>
          <div className="payment_details">
            {/* stripe magic */}
            <form onClick={submitHandler}>
              <CardElement onChange={handleChange} />

              <div className="payment_pricecontainer">
                <CurrencyFormat
                  renderText={(value) => <h3> Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p> Processing </p> : "Buy Now"}</span>
                </button>
              </div>
              {/* show error if any */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
