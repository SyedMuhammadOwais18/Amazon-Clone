import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

//public key
const promise = loadStripe(
  "pk_test_51Js7TjSBeewhZlr5ee3fgIakOwuf9J5SoLjpmJxOoRwXohBzY4rhc1i4o97TKXIy914FaEirKuoCMdiIcDTPSpiR003UUMH0NJ"
);

function App() {
  const [{}, dispatch] = useStateValue();
  //will run once when app component loads
  //to keep track who signed in
  useEffect(() => {
    //it fires when we login or logout
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >> ", authUser);

      if (authUser) {
        //the user just logged in
        //whenever the user is logged in push the user in the data layer
        //and eradicate it when it is logged out
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user just logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        {/* header is render at every page that why put outside the switch */}

        <Switch>
        <Route path="/orders">
            <Header/>

            <Orders/>
          </Route>
          <Route path="/login">
            {/* <Header/> */}

            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/* hoc(higher order component) */}
            <Elements stripe = {promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
        {/* <h1>Amazon clone</h1> */}
      </div>
    </Router>
  );
}

export default App;
