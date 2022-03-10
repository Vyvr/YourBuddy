/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import EditIcon from "../../resources/icons/gear-fill.svg";

import { COLORS } from "../../shared/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-right: 1px solid #f1f2f4;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
  border-image: linear-gradient(rgba(0, 0, 0, 0.1), transparent) 0;

  position: absolute;
  height: calc(100% - 60px);
  width: 340px;
  overflow-y: hidden;
`;

const ProfilePictureWrapper = styled.div`
  border-radius: 50%;
  margin-top: 40px;

  & img {
    width: 150px;
    height: 150px;
    border: none;
    display: block;

    border-radius: 50%;
  }
`;

const UserDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  color: ${COLORS.font};
`;

const UserDataLabel = styled.label`
  font-size: 24px;
  font-weight: 700;
`;

const Edit = styled(NavLink)`
  position: absolute;
  left: 10px;
  top: 16px;
  opacity: 0.5;
  transition: 0.5s;

  width: 10px;
  height: 10px;

  &:hover {
    opacity: 1;
  }
`;

const UserProfileWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: center;
  color: ${COLORS.font};
  font-size: 24px;
  font-weight: 700;
`;

const UserProfile = (props) => {
  return (
    <Wrapper className="user-profile-content">
      <UserProfileWrapper>User profile</UserProfileWrapper>
      {console.log(props.image)}
      <ProfilePictureWrapper className="profile-picture-wrapper">
        <img
          src={`http://localhost:5000/${props.image}`}
          alt="profile_pic"
          className="user-profile-picture"
        />
      </ProfilePictureWrapper>
      <UserDataWrapper className="profile-name-surname">
        <UserDataLabel className="name-label">{props.name}</UserDataLabel>
        <UserDataLabel className="surname-label">{props.surname}</UserDataLabel>
      </UserDataWrapper>
      <Edit
        className="edit-user-button"
        to={{
          pathname: "/user/edit-user",
          state: {
            userId: props.userId,
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
    </Wrapper>
  );
};

export default UserProfile;
