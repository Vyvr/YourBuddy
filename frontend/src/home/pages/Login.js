/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthContent from "../../shared/components/content/AuthContent";
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  ErrorLabelWrapper,
  ErrorLabel,
} from "../../shared/components/forms/formTemplate";

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
          {failedLogin && (
            <ErrorLabelWrapper>
              <ErrorLabel>Passed data is incorrect</ErrorLabel>
            </ErrorLabelWrapper>
          )}
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
