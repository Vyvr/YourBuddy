/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import AuthContent from "../../shared/components/content/AuthContent";

import "./Register.css";

const ErrorLabel = styled.label`
  height: 60px;
  width: 100%;
  text-align: center;
  align-self: center;
  color: red;
`;

const Register = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [failedRegistration, setFailedRegistration] = useState(false);

  const authUserSubmitHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          surname: data.surname,
          mail: data.mail,
          password: data.password,
        }),
      });
      if (response.status === 422) setFailedRegistration(true);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (response.status === 200) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContent>
      <form
        className="login-form"
        onSubmit={handleSubmit(authUserSubmitHandler)}
      >
        <div className="login-form-content">
          <div>
            <input
              className="nick-input"
              type="text"
              placeholder="name"
              {...register("name")}
            />
          </div>
          <div>
            <input
              className="password-input"
              type="text"
              placeholder="surname"
              {...register("surname")}
            />
          </div>
          <div>
            <input
              className="password-input"
              type="text"
              placeholder="mail"
              {...register("mail")}
            />
          </div>
          <div>
            <input
              className="password-input"
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </div>
          {failedRegistration && <ErrorLabel>Incorrect data passed</ErrorLabel>}
          <div className="register-button-div">
            <button className="register-button" type="submit">
              Register
            </button>
          </div>
        </div>
      </form>
    </AuthContent>
  );
};

export default Register;
