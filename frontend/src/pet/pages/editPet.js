/** @format */

import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import UserContent from "../../shared/components/content/UserContent";
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  DeleteButton,
  ErrorLabel,
  ErrorLabelWrapper,
} from "../../shared/components/forms/formTemplate";

const EditPet = (props) => {
  const { register, handleSubmit } = useForm();
  const [invalidData, setInvalidData] = useState(false);
  let location = useLocation();
  const history = useHistory();

  const birthDate = new Date(location.state.born).toISOString().split("T")[0];

  const editPetHandler = async (data) => {
    if (!data.name || !data.born || !data.weight || !data.breed) {
      setInvalidData(true);
      return;
    }

    try {
      await fetch("http://localhost:5000/api/pet/edit", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          id: location.state.id,
          name: data.name,
          born: data.born,
          weight: data.weight,
          breed: data.breed,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/user/dashboard");
    window.location.reload();
  };

  const deletePetHandler = async () => {
    try {
      await fetch("http://localhost:5000/api/pet/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: location.state.id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContent>
      <Form className="edit-pet-form" onSubmit={handleSubmit(editPetHandler)}>
        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="Name"
            defaultValue={location.state.name}
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
            placeholder="Breed"
            defaultValue={location.state.breed}
            name="breed"
            id="breed"
            {...register("breed")}
          />
          <FormLabel htmlFor="breed" className="form__label">
            Breed
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="date"
            className="form__field"
            placeholder="Date"
            defaultValue={birthDate}
            name="born"
            id="born"
            {...register("born")}
          />
          <FormLabel htmlFor="born" className="form__label">
            Born
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="number"
            className="form__field"
            placeholder="Weight"
            defaultValue={location.state.weight}
            name="weight"
            id="weight"
            {...register("weight")}
          />
          <FormLabel htmlFor="weight" className="form__label">
            Weight
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Edit pet</LoginButton>
          </ButtonWrapper>
        </FormGroup>

        {invalidData && (
          <ErrorLabelWrapper>
            <ErrorLabel>Invalid data passed</ErrorLabel>
          </ErrorLabelWrapper>
        )}

        <FormGroup>
          <ButtonWrapper>
            <DeleteButton onClick={deletePetHandler}>Delete pet</DeleteButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>
    </UserContent>
  );
};

export default EditPet;
