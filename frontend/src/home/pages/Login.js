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
        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="E-mail"
            name="mail"
            id="mail"
            {...register("mail")}
          />
          <FormLabel htmlFor="mail" className="form__label">
            E-mail
          </FormLabel>
        </FormGroup>
        <FormGroup className="form__group">
          <FormInput
            type="password"
            className="form__field"
            placeholder="password"
            name="password"
            id="password"
            {...register("password")}
          />
          <FormLabel htmlFor="password" className="form__label">
            Password
          </FormLabel>
        </FormGroup>
        {failedLogin && (
          <FormGroup>
            <ErrorLabelWrapper>
              <ErrorLabel>Mail or password is incorrect</ErrorLabel>
            </ErrorLabelWrapper>
          </FormGroup>
        )}
        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Login</LoginButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>
    </AuthContent>
  );
};

export default Login;
