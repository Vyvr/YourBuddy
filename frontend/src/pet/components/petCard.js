/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import petProfilePic from "../../resources/pet/pet_profile_pic.jpg";
import EditIcon from "../../resources/icons/gear-fill.svg";
import DocIcon from "../../resources/icons/doctor.svg";
import InfoIcon from "../../resources/icons/info-circle-fill.svg";
import { COLORS } from "../../shared/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  justify-self: center;
  align-self: center;

  border: 1px solid ${COLORS.font};
  border-radius: 10px;

  width: 200px;
  height: 300px;

  color: ${COLORS.font};

  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.2);
  border-image: linear-gradient(rgba(1, 5, 60, 0.5), transparent);

  & img {
    width: 100px;
    height: 100px;
    border: none;
    border-radius: 50%;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 15px;
`;

const PetPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
  height: 10px;
  margin-top: 10px;
`;

const Edit = styled(NavLink)`
  opacity: 0.5;
  transition: 0.5s;

  width: 10px;
  height: 10px;

  &:hover {
    opacity: 1;
  }
`;

const Label = styled.label``;

const PetCard = (props) => {
  return (
    <Wrapper className="pet-card-content">
      <img
        src={`http://localhost:5000/${props.image}`}
        alt="pet_profile_pic"
        className="pet-profile-picture"
      />
      <LabelWrapper>
        <Label className="pet-name">
          <b>{props.name}</b>
        </Label>
        <Label className="pet-age">
          <b>Age:</b> {props.year} yo and {props.month} months
        </Label>
        <Label className="pet-weight">
          <b>Breed:</b> {props.breed}
        </Label>
        <Label className="pet-weight">
          <b>Weight:</b> {props.weight}kg
        </Label>
        <Label className="pet-weight">
          <b>Sex:</b> {props.sex}
        </Label>
      </LabelWrapper>
      <PetPanel>
        <Edit
          className="sign-in-to-vet-button"
          to={{
            pathname: "/visit/create",
            state: {
              id: props.id,
              name: props.name,
              age: props.age,
              weight: props.weight,
              owner: props.owner,
            },
          }}
          exact
        >
          <img
            src={DocIcon}
            alt="docIcon"
            style={{ width: "20px", height: "20px" }}
          />
        </Edit>
        <Edit
          className="edit-pet-button"
          to={{
            pathname: "/user/edit-pet",
            state: {
              id: props.id,
              name: props.name,
              born: props.born,
              weight: props.weight,
              breed: props.breed,
            },
          }}
          exact
        >
          <img
            src={EditIcon}
            alt="editIcon"
            style={{ width: "20px", height: "20px" }}
          />
        </Edit>
        <Edit
          className="pet-info-button"
          to={{
            pathname: "/pet/pet-info",
            state: {
              id: props.id,
              name: props.name,
              born: props.born,
              weight: props.weight,
              breed: props.breed,
              vaccinations: props.vaccinations,
            },
          }}
          exact
        >
          <img
            src={InfoIcon}
            alt="infoIcon"
            style={{ width: "20px", height: "20px" }}
          />
        </Edit>
      </PetPanel>
    </Wrapper>
  );
};

export default PetCard;
