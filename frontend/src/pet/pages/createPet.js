/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import getCookieValue from "./../../scripts/getCookieValue";

import UserContent from "../../shared/components/content/UserContent";

import "./createPet.css";

const CreatePet = () => {
  const { register, handleSubmit } = useForm();

  const addPetHandler = async (data) => {
    try {
      await fetch("http://localhost:5000/api/pet/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          age: data.age,
          weight: data.weight,
          owner: getCookieValue("userId"),
        }),
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/user/dashboard");
    window.location.reload();
  };

  const history = useHistory();

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

export default CreatePet;
