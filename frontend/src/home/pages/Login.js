/** @format */

import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthContent from "../../shared/components/content/AuthContent";

import SessionStorage from "../../scripts/sessionStorage";

import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [mail, setMail] = SessionStorage();
  const [loggedIn, setLoggedIn] = SessionStorage(false);
  const [name, setName] = SessionStorage();
  const [surname, setSurname] = SessionStorage();

  const authSubmitHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          mail: data.mail,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.status === 200) {
        setLoggedIn(true);
        setMail(responseData.mail);
        setName(responseData.name);
        setSurname(responseData.surname);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  return (
    <AuthContent>
      {loggedIn ? history.push("/user/user-list") : undefined}
      <form className="login-form" onSubmit={handleSubmit(authSubmitHandler)}>
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
          <div className="button-div">
            <button
              className="login-button"
              type="submit"
              onClick={loggedIn ? history.push("/user/dashboard") : undefined}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </AuthContent>
  );
};

export default Login;
