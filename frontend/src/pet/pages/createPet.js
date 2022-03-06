/** @format */

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import getCookieValue from "./../../scripts/getCookieValue";

import UserContent from "../../shared/components/content/UserContent";
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  Checkbox,
  CheckboxWrapper,
  CheckboxInsideWrapper,
  CheckboxLabel,
  ButtonWrapper,
  LoginButton,
  ErrorLabel,
  ErrorLabelWrapper,
} from "../../shared/components/forms/formTemplate";

const CreatePet = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [invalidData, setInvalidData] = useState(false);
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

    if (!data.name || !data.born || !data.weight || !data.breed) {
      setInvalidData(true);
      return;
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
      <Form onSubmit={handleSubmit(addPetHandler)}>
        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="Name"
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
            name="weight"
            id="weight"
            {...register("weight")}
          />
          <FormLabel htmlFor="weight" className="form__label">
            Weight
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <CheckboxWrapper>
            <CheckboxLabel>Sex:</CheckboxLabel>
            <CheckboxInsideWrapper>
              <CheckboxLabel>Male</CheckboxLabel>
              <Checkbox
                onChange={handleMaleChange}
                type="checkbox"
                ref={male}
              />
            </CheckboxInsideWrapper>
            <CheckboxInsideWrapper>
              <CheckboxLabel>Female</CheckboxLabel>
              <Checkbox
                onChange={handleFemaleChange}
                type="checkbox"
                ref={female}
              />
            </CheckboxInsideWrapper>
            <CheckboxInsideWrapper>
              <CheckboxLabel>Other</CheckboxLabel>
              <Checkbox
                onChange={handleOtherChange}
                type="checkbox"
                ref={other}
              />
            </CheckboxInsideWrapper>
          </CheckboxWrapper>
        </FormGroup>

        {invalidData && (
          <ErrorLabelWrapper>
            <ErrorLabel>Invalid data passed</ErrorLabel>
          </ErrorLabelWrapper>
        )}

        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Add new pet</LoginButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>
    </UserContent>
  );
};

export default CreatePet;
