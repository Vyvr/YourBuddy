/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import validator from "validator";

import UserContent from "../../shared/components/content/UserContent";
import PasswordEye from "../../resources/user/password_eye.png";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 80px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  height: 100px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  justify-self: right;
`;
const Input = styled.input`
  font-family: inherit;
  margin-left: 10px;
  height: 20px;
  width: 30%;
  align-self: start;
`;

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  height: 60px;
  width: 160px;
  align-self: center;
`;

const ErrorLabel = styled.label`
  height: 60px;
  width: 100%;
  text-align: center;
  align-self: center;
  color: red;
`;

const EditUser = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [vetType, setVetType] = useState("false");
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isSurnameEmpty, setIsSurnameEmpty] = useState(false);
  const [isMailEmpty, setIsMailEmpty] = useState(false);
  const [isMail, setIsMail] = useState(true);

  let location = useLocation();

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/" + location.state.userId
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUserData(responseData.existingUser);
        setName(responseData.existingUser.name);
        setSurname(responseData.existingUser.surname);
        setMail(responseData.existingUser.mail);
        responseData.existingUser.type.includes("vet")
          ? setVetType(true)
          : setVetType(false);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getUserData();
  }, [location.state.userId]);

  const sendData = async () => {
    if (!name || name.length === 0) {
      setIsNameEmpty(true);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      return;
    }
    if (!surname || surname.length === 0) {
      setIsSurnameEmpty(true);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsNameEmpty(false);
      return;
    }
    if (mail.length === 0) {
      setIsMailEmpty(true);
      setIsMail(true);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    }
    if (!validator.isEmail(mail)) {
      setIsMail(false);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    }
    if (!password || !secondPassword || password !== secondPassword) {
      setIsPasswordsMatch(false);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    }
    if (password.length < 6) {
      setPasswordTooShort(true);
      setIsMail(true);
      setIsMailEmpty(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    }

    setIsMail(true);
    setIsMailEmpty(false);
    setPasswordTooShort(false);
    setIsPasswordsMatch(true);
    setIsSurnameEmpty(false);
    setIsNameEmpty(false);
    console.log(
      "name: " + name,
      "surname: " + surname,
      "mail: " + mail,
      "vet: " + vetType,
      "password: " + password,
      "secondPassword: " + secondPassword
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSecondPasswordChange = (e) => {
    setSecondPassword(e.target.value);
  };

  const handleVetTypeChange = (e) => {
    setVetType(e.target.checked);
  };

  return (
    <UserContent>
      {!isLoading && userData && (
        <ContentWrapper>
          <Wrapper>
            <Label>Name:</Label>
            <Input defaultValue={userData.name} onChange={handleNameChange} />
          </Wrapper>
          <Wrapper>
            <Label>Surname:</Label>
            <Input
              defaultValue={userData.surname}
              onChange={handleSurnameChange}
            />
          </Wrapper>
          <Wrapper>
            <Label>Mail:</Label>
            <Input defaultValue={userData.mail} onChange={handleMailChange} />
          </Wrapper>
          <Wrapper>
            <Label>Password:</Label>
            <Input type="password" onChange={handlePasswordChange} />
          </Wrapper>
          <Wrapper>
            <Label>Type password again:</Label>
            <Input type="password" onChange={handleSecondPasswordChange} />
          </Wrapper>
          <Wrapper>
            <Label>Are you vet?:</Label>
            <Checkbox
              type="checkbox"
              defaultChecked={userData.type.includes("vet") ? true : false}
              onChange={handleVetTypeChange}
            />
          </Wrapper>
          {!isPasswordsMatch && (
            <ErrorLabel>Your passwords doesn't match</ErrorLabel>
          )}
          {passwordTooShort && (
            <ErrorLabel>Password minimum length is 6 characters</ErrorLabel>
          )}
          {isNameEmpty && <ErrorLabel>Name can't be empty</ErrorLabel>}
          {isSurnameEmpty && <ErrorLabel>Surname can't be empty</ErrorLabel>}
          {!isMail && <ErrorLabel>E-mail address is not valid</ErrorLabel>}
          {isMailEmpty && (
            <ErrorLabel>E-mail address can't be empty</ErrorLabel>
          )}
          <SubmitButton onClick={sendData}>Submit</SubmitButton>
        </ContentWrapper>
      )}
    </UserContent>
  );
};

export default EditUser;
