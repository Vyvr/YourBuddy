/** @format */

import React from "react";

import profilePic from "../../resources/user/profile_pic.jpg";
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

const VetProfile = (props) => {
  return (
    // <div className="vet-profile-content">
    //   <div className="vet-profile-picture-wrapper">
    //     <img
    //       src={profilePic}
    //       alt="profile_pic"
    //       className="vet-profile-picture"
    //     />
    //   </div>
    //   <div className="vet-profile-name-surname">
    //     <div className="vet-name-label">{props.name}</div>
    //     <div className="vet-surname-label">{props.surname}</div>
    //   </div>
    // </div>

    <Wrapper className="vet-profile-content">
      <ProfilePictureWrapper className="profile-picture-wrapper">
        <img
          src={profilePic}
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
