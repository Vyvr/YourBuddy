/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthContent from "../../shared/components/content/AuthContent";

import "./Register.css";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [userRegister, setUserRegister] = useState(true);

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

      const responseData = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userId", responseData.user.id);
        sessionStorage.setItem("mail", responseData.user.mail);
        sessionStorage.setItem("name", responseData.user.name);
        sessionStorage.setItem("surname", responseData.user.surname);
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const authVetSubmitHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/vet/signup", {
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

      const responseData = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userId", responseData.user.id);
        sessionStorage.setItem("mail", responseData.user.mail);
        sessionStorage.setItem("name", responseData.user.name);
        sessionStorage.setItem("surname", responseData.user.surname);
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeRegisterForm = () => {
    if (userRegister === true) {
      setUserRegister(false);
      return;
    }
    setUserRegister(true);
  };

  return (
    <AuthContent>
      <form
        className="login-form"
        onSubmit={
          userRegister
            ? handleSubmit(authUserSubmitHandler)
            : handleSubmit(authVetSubmitHandler)
        }
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
          <div className="button-div">
            <button className="login-button" type="submit">
              Register
            </button>
            <button
              className="change-register-button"
              type="button"
              onClick={changeRegisterForm}
            >
              {userRegister ? "Register as a vet" : "Register as a user"}
            </button>
          </div>
        </div>
      </form>
    </AuthContent>
  );
};

export default Register;
