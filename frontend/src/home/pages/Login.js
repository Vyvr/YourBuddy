/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import AuthContent from "../../shared/components/content/AuthContent";

const ErrorLabel = styled.label`
  height: 60px;
  width: 100%;
  text-align: center;
  align-self: center;
  color: red;
`;

const Form = styled.form`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const FormGroup = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 30%;
`;

const FormInput = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.5s;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #388087, #b4dcc1);
    border-image-slice: 1;
  }

  &:not(:placeholder-shown) ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;

  font-size: 1.3rem;
  cursor: text;
  top: 20px;

  ${FormInput}:focus ~ & {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LoginButton = styled.button`
  height: 40px;
  width: 120px;
  align-self: center;
  justify-self: center;
  border: none;
  text-decoration: none;
  border-radius: 20px;

  border: none;
  cursor: pointer;
  text-align: center;
  background-color: #438489;
  color: white;
  font-weight: 700;
  transition: 0.5s;

  &:hover {
    background-color: #6fb3b8;
  }
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
      <Form
        className="login-form"
        onSubmit={handleSubmit(authUserSubmitHandler)}
      >
        <FormGroup class="form__group">
          <FormInput
            type="input"
            class="form__field"
            placeholder="E-mail"
            name="mail"
            id="mail"
            {...register("mail")}
          />
          <FormLabel for="mail" class="form__label">
            E-mail
          </FormLabel>
        </FormGroup>
        <FormGroup class="form__group">
          <FormInput
            type="password"
            class="form__field"
            placeholder="password"
            name="password"
            id="password"
            {...register("password")}
          />
          <FormLabel for="password" class="form__label">
            Password
          </FormLabel>
          {failedLogin && <ErrorLabel>Passed data is incorrect</ErrorLabel>}
        </FormGroup>
        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Login</LoginButton>
          </ButtonWrapper>
        </FormGroup>
        {/* <div className="login-form-content">
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
        </div> */}
      </Form>
    </AuthContent>
  );
};

export default Login;
