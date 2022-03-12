/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import EditIcon from "../../resources/icons/gear-fill.svg";
import HireIcon from "../../resources/icons/hire-worker.svg";
import WorkersIcon from "../../resources/icons/person-lines-fill.svg";
import { COLORS } from "../../shared/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${COLORS.menu_button};
  color: ${COLORS.font};
  font-weight: 600;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.2);

  width: 300px;
  height: 200px;
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

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
  height: 10px;
  margin-top: 10px;
`;

const Label = styled.label``;

const clinicCard = (props) => {
  return (
    <Wrapper className="clinic-card-content">
      <Label className="clinic-name-div">{props.name}</Label>
      <Label className="clinic-address-div">
        {props.city}, {props.street} {props.block}
        {props.apartment ? "/" : ""}
        {props.apartment}
      </Label>

      <IconsWrapper>
        <Edit
          className="edit-clinic-button"
          to={{
            pathname: "/vet/edit-clinic",
            state: {
              name: props.name,
              owner: props.owner,
              country: props.country,
              city: props.city,
              street: props.street,
              block: props.block,
              apartment: props.apartment,
              zipCode: props.zipCode,
              fromHour: props.fromHour,
              fromMinutes: props.fromMinutes,
              toHour: props.toHour,
              toMinutes: props.toMinutes,
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
          className="add-worker-button"
          to={{
            pathname: "/vet/add-worker",
            state: {
              id: props.id,
            },
          }}
          exact
        >
          <img
            src={HireIcon}
            alt="hireIcon"
            style={{ width: "20px", height: "20px" }}
          />
        </Edit>

        <Edit
          className="workers-list-button"
          to={{
            pathname: "/vet/workers-list",
            state: {
              id: props.id,
            },
          }}
          exact
        >
          <img
            src={WorkersIcon}
            alt="workersIcon"
            style={{ width: "20px", height: "20px" }}
          />
        </Edit>
      </IconsWrapper>
    </Wrapper>
  );
};

export default clinicCard;
