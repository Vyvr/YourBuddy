/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthContent from "../../shared/components/content/AuthContent";

import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);

  const authSubmitHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          mail: data.mail,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setLoggedIn(true);
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userId", responseData.existingUser._id);
        sessionStorage.setItem("mail", responseData.existingUser.mail);
        sessionStorage.setItem("name", responseData.existingUser.name);
        sessionStorage.setItem("surname", responseData.existingUser.surname);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  return (
    <AuthContent>
      {loggedIn ? history.push("/user/dashboard") : undefined}
      <form className="login-form" onSubmit={handleSubmit(authSubmitHandler)}>
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
          </div>
        </div>
      </form>
    </AuthContent>
  );
};

export default Login;
