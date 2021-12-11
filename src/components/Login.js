import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { auth } from "../firebase";

import "./Login.css";

function Login() {
  //allow to change url programatically
  const history = useHistory();
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const signin = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email,password).then((auth) => {
            history.push("/");
    }).catch((error) => {
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if(auth){
            history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit" className="login_signinbutton" onClick={signin}>
            Sign In
          </button>
        </form>
        <p>By Signing-in you agree to Amazon's Conditions of use & sale</p>
        <button className="login_registerbutton" onClick={register}>
          Create your amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
