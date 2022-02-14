/** @format */

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import getCookieValue from "./../../scripts/getCookieValue";

import UserContent from "../../shared/components/content/UserContent";

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  width: 100%;
  height: 40%;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: left;
  padding: 0px 0px;
  margin-left: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  justify-self: right;
`;

const SexLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  font-family: inherit;
  margin-left: 10px;
  height: 20px;
  align-self: center;
  justify-self: left;
`;

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

const ButtonWrapper = styled.div`
  align-items: center;
  justify-content: center;
  grid-column: 1 / span 2;
`;

const SubmitButton = styled.button`
  height: 60px;
  width: 160px;
  align-self: center;
  justify-self: left;
  grid-column: 2;
  margin-left: 70px;
`;

const CreatePet = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const male = useRef(null);
  const female = useRef(null);
  const other = useRef(null);

  const addPetHandler = async (data) => {
    let sex;
    if (male.current.checked) {
      sex = "male";
    } else if (female.current.checked) {
      sex = "female";
    } else {
      sex = "other";
    }
    try {
      await fetch("http://localhost:5000/api/pet/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          born: data.born,
          weight: data.weight,
          breed: data.breed,
          sex: sex,
          owner: getCookieValue("user_id"),
        }),
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/user/dashboard");
    window.location.reload();
  };

  const handleMaleChange = () => {
    female.current.checked = false;
    other.current.checked = false;
    male.current.checked = true;
  };

  const handleFemaleChange = () => {
    female.current.checked = true;
    other.current.checked = false;
    male.current.checked = false;
  };

  const handleOtherChange = () => {
    female.current.checked = false;
    other.current.checked = true;
    male.current.checked = false;
  };

  return (
    <UserContent>
      <StyledForm onSubmit={handleSubmit(addPetHandler)}>
        <StyledGrid>
          <Label>Name:</Label>
          <Input type="text" {...register("name")} />
          <Label>Breed:</Label>
          <Input type="text" {...register("breed")} />
          <Label>Born:</Label>
          <Input type="date" {...register("born")} />
          <Label>Weight:</Label>
          <Input type="text" {...register("weight")} />
          <Label>Sex:</Label>
          <Wrapper>
            <SexLabel>Male</SexLabel>
            <Checkbox onChange={handleMaleChange} type="checkbox" ref={male} />
            <SexLabel>Female</SexLabel>
            <Checkbox
              onChange={handleFemaleChange}
              type="checkbox"
              ref={female}
            />
            <SexLabel>Other</SexLabel>
            <Checkbox
              onChange={handleOtherChange}
              type="checkbox"
              ref={other}
            />
          </Wrapper>
          <SubmitButton type="submit">Add new pet</SubmitButton>
        </StyledGrid>
      </StyledForm>
      {/* <form className="create-pet-form" onSubmit={handleSubmit(addPetHandler)}>
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
            <label>breed:</label>
            <input
              className="pet-breed-input"
              type="text"
              {...register("breed")}
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
          <div>
            <label>sex:</label>
            <div>
              <label>Male:</label>
              <input
                className="pet-sex-male-input"
                type="checkbox"
                {...register("maleSex")}
              />
              <label>Female:</label>
              <input
                className="pet-sex-female-input"
                type="checkbox"
                {...register("femaleSex")}
              />
              <label>Other:</label>
              <input
                className="pet-sex-other-input"
                type="checkbox"
                {...register("otherSex")}
              />
            </div>
          </div>
          <button className="create-pet-button" type="submit">
            Add pet
          </button>
        </div>
      </form> */}
    </UserContent>
  );
};

export default CreatePet;
