/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import UserContent from "../../shared/components/content/UserContent";

import "./createPet.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(sessionStorage.getItem("userId").toString());
  });

  const addPetHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/pet/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          age: data.age,
          weight: data.weight,
          owner: userId,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContent>
      <form className="create-pet-form" onSubmit={handleSubmit(addPetHandler)}>
        <div>
          <div>
            <label>name:</label>
            <input
              className="pet-name-input"
              type="text"
              {...register("name")}
            />
          </div>
          <div>
            <label>age:</label>
            <input className="pet-age-input" type="text" {...register("age")} />
          </div>
          <div>
            <label>weight:</label>
            <input
              className="pet-weight-input"
              type="text"
              {...register("weight")}
            />
          </div>
          <button className="create-pet-button" type="submit">
            Add pet
          </button>
        </div>
      </form>
    </UserContent>
  );
};

export default Login;
