/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import UserContent from "../../shared/components/content/UserContent";

import "./editPet.css";

const EditPet = (props) => {
  const { register, handleSubmit } = useForm();
  let location = useLocation();

  const editPetHandler = async (data) => {
    console.log(location.state);
    try {
      await fetch("http://localhost:5000/api/pet/edit", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          id: location.state.id,
          name: data.name,
          age: data.age,
          weight: data.weight,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContent>
      <form className="edit-pet-form" onSubmit={handleSubmit(editPetHandler)}>
        <div>
          <div>
            <label>name:</label>
            <input
              className="pet-name-input"
              type="text"
              defaultValue={location.state.name}
              {...register("name")}
            />
          </div>
          <div>
            <label>age:</label>
            <input
              className="pet-age-input"
              type="text"
              defaultValue={location.state.age}
              {...register("age")}
            />
          </div>
          <div>
            <label>weight:</label>
            <input
              className="pet-weight-input"
              type="text"
              defaultValue={location.state.weight}
              {...register("weight")}
            />
          </div>
          <button className="edit-pet-confirm-button" type="submit">
            Edit pet
          </button>
        </div>
      </form>
    </UserContent>
  );
};

export default EditPet;
