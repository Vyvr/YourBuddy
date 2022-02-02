/** @format */

import styled from "styled-components";

const ErrorLabel = styled.label`
  width: 100%;
  text-align: center;
  align-self: center;
  color: red;
  margin-top: 30px;
`;

const ErrorLabelWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Form = styled.form`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const FormGroup = styled.div`
  desplay: flex;
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 30%;
`;

const FormInput = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.5s;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #388087, #b4dcc1);
    border-image-slice: 1;
  }

  &:not(:placeholder-shown) ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;

  font-size: 1.3rem;
  cursor: text;
  top: 20px;

  ${FormInput}:focus ~ & {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LoginButton = styled.button`
  height: 40px;
  width: 120px;
  align-self: center;
  justify-self: center;
  border: none;
  text-decoration: none;
  border-radius: 20px;

  border: none;
  cursor: pointer;
  text-align: center;
  background-color: #438489;
  color: white;
  font-weight: 700;
  transition: 0.5s;

  &:hover {
    background-color: #6fb3b8;
  }
`;

export {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  ErrorLabelWrapper,
  ErrorLabel,
};
