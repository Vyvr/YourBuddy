/** @format */

import styled from "styled-components";
import { COLORS } from "../../colors";

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
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 30%;
  align-items: center;
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

const Label = styled.label`
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;
  margin-right: 10px;
  font-size: 1.3rem;
  cursor: text;
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

const DeleteButton = styled.button`
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
  background-color: ${COLORS.delete_button};
  color: white;
  font-weight: 700;
  transition: 0.5s;

  &:hover {
    background-color: ${COLORS.delete_button_hover};
  }
`;

const Switch = styled.input`
  --active: ${COLORS.special_button_hover};
  --active-inner: #fff;
  --focus: 1px ${COLORS.special_button_hover};
  --border: ${COLORS.special_button_hover};
  --border-hover: ${COLORS.special_button_hover};
  --background: #fff;
  --disabled: #f6f8ff;
  --disabled-inner: #e1e6f9;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 21px;
  width: 38px;
  border-radius: 11px;
  outline: none;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0;
  cursor: pointer;
  border: 1px solid var(--bc, var(--border));
  background: var(--b, var(--background));
  transition: 0.3s, border-color 0.3s, box-shadow 0.2s;

  &:after {
    content: "";
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
      opacity var(--d-o, 0.2s);
    left: 2px;
    top: 2px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: var(--ab, var(--border));
    transform: translateX(var(--x, 0));
  }

  &:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: 0.3s;
    --d-t: 0.6s;
    --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    --ab: var(--active-inner);
    --x: 17px;
  }

  &:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: 0.9;
    &:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    &:not(:checked) {
      &:after {
        opacity: 0.6;
      }
    }
  }

  &:hover {
    &:not(:checked) {
      &:not(:disabled) {
        --bc: var(--border-hover);
      }
    }
  }

  &:focus {
    box-shadow: 0 0 0 var(--focus);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CheckboxInsideWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
`;

const CheckboxLabel = styled.label`
  display: block;
  transition: 0.2s;
  color: gray;

  font-size: 1.3rem;
  cursor: text;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-left: 10px;

  opacity: 0.5;

  --active: ${COLORS.special_button_hover};
  --focus: 1px ${COLORS.special_button_hover};
  --border: ${COLORS.special_button_hover};
  --border-hover: ${COLORS.special_button_hover};
`;

const Select = styled.select`
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
  margin-top: 20px;
  text-align: center;
`;

export {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  DeleteButton,
  ErrorLabelWrapper,
  ErrorLabel,
  Checkbox,
  CheckboxWrapper,
  CheckboxInsideWrapper,
  CheckboxLabel,
  Switch,
  Select,
  Label,
};
