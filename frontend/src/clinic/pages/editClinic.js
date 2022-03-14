/** @format */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import VetContent from "./../../shared/components/content/VetContent";
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
import getCookieValue from "../../scripts/getCookieValue";
import { COLORS } from "../../shared/colors";

const StyledLabel = styled.label`
  color: ${COLORS.special_button_font};
  font-weight: bold;
  align-self: center;
  font-size: 1.3rem;
  cursor: text;
  margin-bottom: 16px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 15px 0 0;
  width: 30%;
  align-items: center;
`;

const EditClinic = () => {
  const { register, handleSubmit } = useForm();
  const [dataCorrect, setDataCorrect] = useState(true);
  const history = useHistory();
  let location = useLocation();

  const editClinicSubmitHandler = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/clinic/edit-clinic",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: location.state.id,
            name: data.name,
            owner: getCookieValue("user_id"),
            country: data.country,
            city: data.city,
            street: data.street,
            block: data.block,
            apartment: data.apartment,
            zipCode: data.zipCode,
            open: data.open,
            close: data.close,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setDataCorrect(false);
        throw new Error(responseData.message);
      }
      history.push("/vet/clinic-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VetContent>
      <Form onSubmit={handleSubmit(editClinicSubmitHandler)}>
        <LabelWrapper>
          <StyledLabel>Edit clinic</StyledLabel>
        </LabelWrapper>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            defaultValue={location.state.name}
            {...register("name")}
          />
          <FormLabel htmlFor="name" className="form__label">
            Name
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="Country"
            name="country"
            id="country"
            defaultValue={location.state.country}
            {...register("country")}
          />
          <FormLabel htmlFor="country" className="form__label">
            Country
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="City"
            name="city"
            id="city"
            defaultValue={location.state.city}
            {...register("city")}
          />
          <FormLabel htmlFor="city" className="form__label">
            City
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="Street"
            name="street"
            id="street"
            defaultValue={location.state.street}
            {...register("street")}
          />
          <FormLabel htmlFor="street" className="form__label">
            Street
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="Block"
            name="block"
            id="block"
            defaultValue={location.state.block}
            {...register("block")}
          />
          <FormLabel htmlFor="block" className="form__label">
            Block
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="Apartment"
            name="apartment"
            id="apartment"
            defaultValue={location.state.apartment}
            {...register("apartment")}
          />
          <FormLabel htmlFor="apartment" className="form__label">
            Apartment
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="ZipCode"
            name="zipcode"
            id="zipcode"
            defaultValue={location.state.zipCode}
            {...register("zipCode")}
          />
          <FormLabel htmlFor="zipcode" className="form__label">
            ZipCode
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="time"
            className="form__field"
            placeholder="Open"
            name="open"
            id="open"
            defaultValue={location.state.open}
            {...register("open")}
          />
          <FormLabel htmlFor="open" className="form__label">
            Open:
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="time"
            className="form__field"
            placeholder="Close"
            name="close"
            id="close"
            defaultValue={location.state.close}
            {...register("close")}
          />
          <FormLabel htmlFor="close" className="form__label">
            Close:
          </FormLabel>
        </FormGroup>

        {!dataCorrect && (
          <FormGroup>
            <ErrorLabelWrapper>
              <ErrorLabel>
                Passed data is incorrect. Check your inputs and try again.
              </ErrorLabel>
            </ErrorLabelWrapper>
          </FormGroup>
        )}

        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Submit changes</LoginButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>
    </VetContent>
  );
};

export default EditClinic;
