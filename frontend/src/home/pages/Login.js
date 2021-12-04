/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import getCookieValue from "./../../scripts/getCookieValue";

import AuthContent from "../../shared/components/content/AuthContent";

import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userLogin, setUserLogin] = useState(true);

  const authUserSubmitHandler = async (data) => {
    try {
      await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          mail: data.mail,
          password: data.password,
        }),
      });

      setLoggedIn(getCookieValue("loggedIn"));
      history.push("/user/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const authVetSubmitHandler = async (data) => {
    try {
      await fetch("http://localhost:5000/api/vet/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          mail: data.mail,
          password: data.password,
        }),
      });

      setLoggedIn(getCookieValue("loggedIn"));
      history.push("/vet/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const changeLoginForm = () => {
    if (userLogin === true) {
      setUserLogin(false);
      return;
    }
    setUserLogin(true);
  };

  const history = useHistory();

  return (
    <AuthContent>
      {getCookieValue("loggedIn") === "true"
        ? history.push("/user/dashboard")
        : undefined}
      <form
        className="login-form"
        onSubmit={
          userLogin
            ? handleSubmit(authUserSubmitHandler)
            : handleSubmit(authVetSubmitHandler)
        }
      >
        <div className="login-form-content">
          <div>
            <input
              className="mail-input"
              type="text"
              placeholder="enter your e-mail"
              {...register("mail")}
            />
          </div>
          <div>
            <input
              className="password-input"
              type="password"
              placeholder="enter your password"
              {...register("password")}
            />
          </div>
          <div className="button-div">
            <button className="login-button" type="submit">
              Login
            </button>
            <button
              className="change-login-button"
              type="button"
              onClick={changeLoginForm}
            >
              {userLogin ? "Login as a vet" : "Login as a user"}
            </button>
          </div>
        </div>
      </form>
    </AuthContent>
  );
};

export default Login;
