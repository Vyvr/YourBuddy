/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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

const ClinicDashboard = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const createClinicSubmitHandler = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/clinic/create-clinic",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
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
        throw new Error(responseData.message);
      }
      history.push("/vet/clinic-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VetContent>
      <Form onSubmit={handleSubmit(createClinicSubmitHandler)}>
        <LabelWrapper>
          <StyledLabel>Create new clinic</StyledLabel>
        </LabelWrapper>

        <FormGroup>
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

        <FormGroup>
          <FormInput
            type="input"
            className="form__field"
            placeholder="Country"
            name="country"
            id="country"
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
            {...register("close")}
          />
          <FormLabel htmlFor="close" className="form__label">
            Close:
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Add new pet</LoginButton>
          </ButtonWrapper>
        </FormGroup>

        {/* <div>
          <div>
            <label>Name:</label>
          </div>
          <div>
            <input className="name-input" {...register("name")} />
          </div>
        </div>

        <div>
          <div>
            <label>Country:</label>
          </div>
          <div>
            <input className="country-input" {...register("country")} />
          </div>
        </div>

        <div>
          <div>
            <label>City:</label>
          </div>
          <div>
            <input className="city-input" {...register("city")} />
          </div>
        </div>

        <div>
          <div>
            <label>Street:</label>
          </div>
          <div>
            <input className="street-input" {...register("street")} />
          </div>
        </div>

        <div>
          <div>
            <label>Block:</label>
          </div>
          <div>
            <input className="Block-input" {...register("block")} />
          </div>
        </div>

        <div>
          <div>
            <label>Apartment:</label>
          </div>
          <div>
            <input className="apartment-input" {...register("apartment")} />
          </div>
        </div>

        <div>
          <div>
            <label>ZipCode:</label>
          </div>
          <div>
            <input className="zip-code-input" {...register("zipCode")} />
          </div>
        </div>

        <div className="hours-wrapper">
          <div className="from-hours-div">
            <div>
              <div>
                <label>Open from:</label>
              </div>
              <div>
                <div>
                  <label>Hour:</label>
                </div>
                <div>
                  <input
                    className="from-hour-input"
                    {...register("fromHour")}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Minutes:</label>
                </div>
                <div>
                  <input
                    className="from-minutes-input"
                    {...register("fromMinutes")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="to-hours-div">
            <div>
              <div>
                <label>Open to:</label>
              </div>
              <div>
                <div>
                  <label>Hour:</label>
                </div>
                <div>
                  <input className="to-hour-input" {...register("toHour")} />
                </div>
              </div>
              <div>
                <div>
                  <label>Minutes:</label>
                </div>
                <div>
                  <input
                    className="to-minutes-input"
                    {...register("toMinutes")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-div">
          <button
            type="submit"
            onClick={handleSubmit(createClinicSubmitHandler)}
          >
            Create clinic
          </button>
        </div> */}
      </Form>
    </VetContent>
  );
};

export default ClinicDashboard;
