/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import AuthContent from "../../shared/components/content/AuthContent";

import "./Login.css";

const ErrorLabel = styled.label`
  height: 60px;
  width: 100%;
  text-align: center;
  align-self: center;
  color: red;
`;

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [failedLogin, setFailedLogin] = useState(false);

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
      if (response.status === 401) setFailedLogin(true);
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
          {failedLogin && <ErrorLabel>Passed data is incorrect</ErrorLabel>}
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
