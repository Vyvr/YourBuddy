/** @format */

import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthContent from "../../shared/components/content/AuthContent";

import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const authUserSubmitHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
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
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      history.push("/user/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  return (
    <AuthContent>
      <form
        className="login-form"
        onSubmit={handleSubmit(authUserSubmitHandler)}
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
          <div className="login-button-div">
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
