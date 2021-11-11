/** @format */

import React from "react";

import HomeHeader from "../../shared/components/navigation/HomeHeader";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const authSubmitHandler = async (data) => {
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
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-content">
      <HomeHeader>
        <li>
          <NavLink to="/">GO BACK</NavLink>
        </li>
      </HomeHeader>
      <form className="login-form" onSubmit={handleSubmit(authSubmitHandler)}>
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
        </div>
      </form>
    </div>
  );
};

export default Login;
