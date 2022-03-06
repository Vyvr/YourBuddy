/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import validator from "validator";

import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  ErrorLabelWrapper,
  ErrorLabel,
  Switch,
  Label,
} from "../../shared/components/forms/formTemplate";

import UserContent from "../../shared/components/content/UserContent";

const EditUser = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();

  // const [vetType, setVetType] = useState("false");
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isSurnameEmpty, setIsSurnameEmpty] = useState(false);
  const [isMailEmpty, setIsMailEmpty] = useState(false);
  const [isMail, setIsMail] = useState(true);
  const history = useHistory();
  let location = useLocation();
  const { register, handleSubmit } = useForm();

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
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getUserData();
  }, [location.state.userId]);

  const sendData = async (data) => {
    if (!data.name || data.name.length === 0) {
      setIsNameEmpty(true);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      return;
    }
    if (!data.surname || data.surname.length === 0) {
      setIsSurnameEmpty(true);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsNameEmpty(false);
      return;
    }
    if (data.mail.length === 0) {
      setIsMailEmpty(true);
      setIsMail(true);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    }
    if (!validator.isEmail(data.mail)) {
      setIsMail(false);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsPasswordsMatch(true);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    }
    if (!data.password && !data.rePassword) {
      setIsPasswordsMatch(true);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
    } else if (data.password !== data.rePassword) {
      setIsPasswordsMatch(false);
      setIsMail(true);
      setIsMailEmpty(false);
      setPasswordTooShort(false);
      setIsSurnameEmpty(false);
      setIsNameEmpty(false);
      return;
    } else if (data.password.length < 6) {
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

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/edit-user-credentials",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify({
            id: location.state.userId,
            name: data.name,
            surname: data.surname,
            mail: data.mail,
            password: data.password,
            isVet: data.vetType,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      history.push("/user/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContent>
      {!isLoading && userData && (
        <Form className="edit-user-form" onSubmit={handleSubmit(sendData)}>
          <FormGroup className="form__group">
            <FormInput
              defaultValue={userData.name}
              type="input"
              className="form__field"
              placeholder="name"
              name="name"
              id="name"
              {...register("name")}
            />
            <FormLabel htmlFor="name" className="form__label">
              Name
            </FormLabel>
          </FormGroup>

          <FormGroup className="form__group">
            <FormInput
              type="input"
              className="form__field"
              placeholder="surname"
              defaultValue={userData.surname}
              name="surname"
              id="surname"
              {...register("surname")}
            />
            <FormLabel htmlFor="surname" className="form__label">
              Surname
            </FormLabel>
          </FormGroup>

          <FormGroup className="form__group">
            <FormInput
              type="input"
              className="form__field"
              placeholder="mail"
              defaultValue={userData.mail}
              name="mail"
              id="mail"
              {...register("mail")}
            />
            <FormLabel htmlFor="mail" className="form__label">
              E-mail
            </FormLabel>
          </FormGroup>

          <FormGroup className="form__group">
            <FormInput
              type="password"
              className="form__field"
              placeholder="password"
              name="password"
              id="password"
              {...register("password")}
            />
            <FormLabel htmlFor="password" className="form__label">
              New password
            </FormLabel>
          </FormGroup>

          <FormGroup className="form__group">
            <FormInput
              type="password"
              className="form__field"
              placeholder="rePassword"
              name="rePassword"
              id="rePassword"
              {...register("rePassword")}
            />
            <FormLabel htmlFor="rePassword" className="form__label">
              Re-enter new password
            </FormLabel>
          </FormGroup>

          <FormGroup className="form__group">
            <Label>Are you vet?</Label>
            <Switch
              type="checkbox"
              className="switch"
              name="vetSwitch"
              id="vetSwitch"
              defaultChecked={userData.type.includes("vet") ? true : false}
              {...register("vetType")}
            />
          </FormGroup>

          {!isPasswordsMatch && (
            <ErrorLabelWrapper>
              <ErrorLabel>Your passwords doesn't match</ErrorLabel>
            </ErrorLabelWrapper>
          )}
          {passwordTooShort && (
            <ErrorLabelWrapper>
              <ErrorLabel>Password minimum length is 6 characters</ErrorLabel>
            </ErrorLabelWrapper>
          )}
          {isNameEmpty && (
            <ErrorLabelWrapper>
              <ErrorLabel>Name can't be empty</ErrorLabel>
            </ErrorLabelWrapper>
          )}
          {isSurnameEmpty && (
            <ErrorLabelWrapper>
              <ErrorLabel>Surname can't be empty</ErrorLabel>
            </ErrorLabelWrapper>
          )}
          {!isMail && (
            <ErrorLabelWrapper>
              <ErrorLabel>E-mail address is not valid</ErrorLabel>
            </ErrorLabelWrapper>
          )}
          {isMailEmpty && (
            <ErrorLabelWrapper>
              <ErrorLabel>E-mail address can't be empty</ErrorLabel>
            </ErrorLabelWrapper>
          )}

          <FormGroup>
            <ButtonWrapper>
              <LoginButton type="submit">Submit</LoginButton>
            </ButtonWrapper>
          </FormGroup>
        </Form>
      )}
      {/* {!isLoading && userData && (
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
            <Label>Re-enter password:</Label>
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
      )} */}
    </UserContent>
  );
};

export default EditUser;
