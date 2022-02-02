/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
      <Form
        className="register-form"
        onSubmit={handleSubmit(authUserSubmitHandler)}
      >
        <FormGroup class="form__group">
          <FormInput
            type="input"
            class="form__field"
            placeholder="name"
            name="name"
            id="name"
            {...register("name")}
          />
          <FormLabel for="name" class="form__label">
            Name
          </FormLabel>
        </FormGroup>
        <FormGroup class="form__group">
          <FormInput
            type="input"
            class="form__field"
            placeholder="surname"
            name="surname"
            id="surname"
            {...register("surname")}
          />
          <FormLabel for="surname" class="form__label">
            Surname
          </FormLabel>
        </FormGroup>
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
            placeholder="Password"
            name="password"
            id="password"
            {...register("password")}
          />
          <FormLabel for="password" class="form__label">
            Password
          </FormLabel>
        </FormGroup>
        {failedRegistration && (
          <ErrorLabelWrapper>
            <ErrorLabel>Passed data is incorrect. Try again.</ErrorLabel>
          </ErrorLabelWrapper>
        )}
        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Register</LoginButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>

      {/* <form
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
      </form> */}
    </AuthContent>
  );
};

export default Register;
