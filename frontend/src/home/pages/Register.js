/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";

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
  const [failedMessage, setFailedMessage] = useState("");

  const authUserSubmitHandler = async (data) => {
    if (data.name.length === 0) {
      setFailedRegistration(true);
      setFailedMessage("Name is empty");
      return;
    }
    if (data.surname.length === 0) {
      setFailedRegistration(true);
      setFailedMessage("Surname is empty");
      return;
    }
    if (data.mail.length === 0) {
      setFailedRegistration(true);
      setFailedMessage("Mail is empty");
      return;
    }
    if (!validator.isEmail(data.mail)) {
      setFailedRegistration(true);
      setFailedMessage("Mail is not valid");
      return;
    }
    if (data.password !== data.rePassword) {
      setFailedRegistration(true);
      setFailedMessage("Passwords doesn't match");
      return;
    }

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
      if (response.status === 422) {
        setFailedRegistration(true);
        setFailedMessage("User with that e-mail already exists");
      }
      if (response.status === 500) {
        setFailedRegistration(true);
        setFailedMessage("Database error. Please try again later");
      }
      if (response.status === 421) {
        setFailedRegistration(true);
        setFailedMessage("Invalid inputs passed");
      }
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
        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="name"
            name="name"
            id="name"
            {...register("name")}
          />
          <FormLabel htmlFor="name" className="form__label">
            Name
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="surname"
            name="surname"
            id="surname"
            {...register("surname")}
          />
          <FormLabel htmlFor="surname" className="form__label">
            Surname
          </FormLabel>
        </FormGroup>

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
            placeholder="Password"
            name="password"
            id="password"
            {...register("password")}
          />
          <FormLabel htmlFor="password" className="form__label">
            Password
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="password"
            className="form__field"
            placeholder="Re-type password"
            name="re-password"
            id="re-password"
            {...register("rePassword")}
          />
          <FormLabel htmlFor="re-password" className="form__label">
            Re-type password
          </FormLabel>
        </FormGroup>

        {failedRegistration && (
          <ErrorLabelWrapper>
            <ErrorLabel>{failedMessage}</ErrorLabel>
          </ErrorLabelWrapper>
        )}

        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Register</LoginButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>
    </AuthContent>
  );
};

export default Register;
