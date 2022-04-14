/** @format */
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  DeleteButton,
  ErrorLabelWrapper,
  ErrorLabel,
  Label,
} from "../../shared/components/forms/formTemplate";

const Popup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  background: white;
`;

const DeleteClinicPopup = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [correctName, setCorrectName] = useState(true);

  const deleteClinic = async (e) => {
    e.preventDefault();
    if (name != props.clinicName) {
      setCorrectName(false);
      return;
    }
    setCorrectName(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/clinic/delete-clinic",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: props.clinicId,
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Popup>
      <PopupInner>
        <Form onSubmit={(e) => deleteClinic}>
          <FormGroup>
            <FormInput
              type="input"
              className="form__field"
              placeholder="Clinic Name"
              name="name"
              id="name"
              onChange={handleNameChange}
            />
            <FormLabel htmlFor="name" className="form__label">
              Clinic name
            </FormLabel>
          </FormGroup>

          {!correctName && (
            <ErrorLabel style={{ marginTop: "10px", fontSize: "18px" }}>
              Wrong clinic name
            </ErrorLabel>
          )}

          <ButtonWrapper style={{ marginTop: "10px" }}>
            <DeleteButton
              style={{ marginRight: "30px" }}
              onClick={deleteClinic}
              type="sumbit"
            >
              Delete Clinic
            </DeleteButton>

            {props.children}
          </ButtonWrapper>
        </Form>
      </PopupInner>
    </Popup>
  );
};

export default DeleteClinicPopup;
