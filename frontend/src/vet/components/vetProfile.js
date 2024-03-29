/** @format */

import React from "react";

import styled from "styled-components";

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

const VetDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  color: ${COLORS.font};
`;

const VetDataLabel = styled.label`
  font-size: 24px;
  font-weight: 700;
`;

const VetProfileWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: center;
  color: ${COLORS.font};
  font-size: 24px;
  font-weight: 700;
`;

const VetProfile = (props) => {
  return (
    <Wrapper className="vet-profile-content">
      <VetProfileWrapper>Vet profile</VetProfileWrapper>
      <ProfilePictureWrapper className="profile-picture-wrapper">
        <img
          src={`http://localhost:5000/${props.image}`}
          alt="profile_pic"
          className="user-profile-picture"
        />
      </ProfilePictureWrapper>
      <VetDataWrapper className="profile-name-surname">
        <VetDataLabel className="name-label">{props.name}</VetDataLabel>
        <VetDataLabel className="surname-label">{props.surname}</VetDataLabel>
      </VetDataWrapper>
    </Wrapper>
  );
};

export default VetProfile;
