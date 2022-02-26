/** @format */

import React from "react";
import styled from "styled-components";

import profilePic from "../../resources/user/profile_pic.jpg";

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 600px;
  height: 200px;
  background-color: #388087;
  margin-bottom: 20px;

  & img {
    width: 130px;
    height: 130px;
    border-radius: 100%;
    margin-left: 30px;
    align-self: center;
  }
`;

const DeleteButton = styled.button`
  height: 50px;
  width: 150px;
  border: none;
  cursor: pointer;
  background-color: #fd6769;
  color: white;
  font-weight: 700;
  transition: 0.5s;

  &:hover {
    background-color: #d45759;
  }
`;

const UserCard = (props) => {
  const deleteUserHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          id: props.id,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Content className="user-card-content">
      <img src={profilePic} alt="profile_pic" className="profile-picture" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "1px 1px 0 #000",
        }}
      >
        <div className="name" style={{ fontSize: "24px", marginRight: "8px" }}>
          <label className="name-label">{props.name}</label>
        </div>
        <div className="surname" style={{ fontSize: "24px" }}>
          <label className="surname-label">{props.surname}</label>
        </div>
        <div className="mail" style={{ fontSize: "24px" }}>
          <label className="mail-label">{props.mail}</label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DeleteButton
          className="delete-user-button"
          onClick={deleteUserHandler}
        >
          DELETE
        </DeleteButton>
      </div>
    </Content>
  );
};

export default UserCard;
