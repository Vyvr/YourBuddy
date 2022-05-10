/** @format */

import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import UserContent from '../../shared/components/content/UserContent';
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  DeleteButton,
  ErrorLabel,
  ErrorLabelWrapper,
} from '../../shared/components/forms/formTemplate';
import ImageUpload from '../../shared/components/forms/imageUpload';
import PopupWindow from '../../shared/components/popup';

const EditPet = (props) => {
  const { register, handleSubmit } = useForm();
  const [invalidData, setInvalidData] = useState(false);
  const [picture, setPicture] = useState();
  const [showPopUp, setShowPopup] = useState(false);
  const [deletePetName, setDeletePetName] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorToLabelText, setErrorToLabelText] = useState('');
  let location = useLocation();
  const history = useHistory();

  const birthDate = new Date(location.state.born)
    .toISOString()
    .split('T')[0];

  const editPetHandler = async (data) => {
    if (!data.name || !data.born || !data.weight || !data.breed) {
      setInvalidData(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', location.state.id);
      formData.append('name', data.name);
      formData.append('born', data.born);
      formData.append('weight', data.weight);
      formData.append('breed', data.breed);
      formData.append('image', picture);
      await fetch('http://localhost:5000/api/pet/edit', {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors',
        headers: {
          'Content-type': 'application/json',
        },

        body: formData,
      });
    } catch (err) {
      console.log(err);
    }
    history.push('/user/dashboard');
    window.location.reload();
  };

  const deletePetHandler = async (e) => {
    e.preventDefault();
    if (deletePetName !== location.state.name) {
      setErrorFlag(true);
      setErrorToLabelText('Invalid pet name');
      return;
    }

    try {
      await fetch('http://localhost:5000/api/pet/delete', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: location.state.id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    history.push('/user/dashboard');
    window.location.reload();
  };

  const handlePictureChange = (id, picture, isValid) => {
    setPicture(picture);
  };

  const handleDeletePetNameChange = (e) => {
    setDeletePetName(e.target.value);
  };

  const deletePetPopup = () => {
    setShowPopup(!showPopUp);
  };

  return (
    <UserContent>
      <Form
        className="edit-pet-form"
        onSubmit={handleSubmit(editPetHandler)}
        style={{ marginTop: '0px' }}
      >
        <FormGroup
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <ImageUpload
            id="image"
            handlePictureChange={handlePictureChange}
            description="Please pick an image to change your's pet avatar."
          />
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="Name"
            defaultValue={location.state.name}
            name="name"
            id="name"
            {...register('name')}
          />
          <FormLabel htmlFor="name" className="form__label">
            Name
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="input"
            className="form__field"
            placeholder="Breed"
            defaultValue={location.state.breed}
            name="breed"
            id="breed"
            {...register('breed')}
          />
          <FormLabel htmlFor="breed" className="form__label">
            Breed
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="date"
            className="form__field"
            placeholder="Date"
            defaultValue={birthDate}
            name="born"
            id="born"
            {...register('born')}
          />
          <FormLabel htmlFor="born" className="form__label">
            Born
          </FormLabel>
        </FormGroup>

        <FormGroup className="form__group">
          <FormInput
            type="number"
            className="form__field"
            placeholder="Weight"
            defaultValue={location.state.weight}
            name="weight"
            id="weight"
            {...register('weight')}
          />
          <FormLabel htmlFor="weight" className="form__label">
            Weight
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <ButtonWrapper>
            <LoginButton type="submit">Edit pet</LoginButton>
          </ButtonWrapper>
        </FormGroup>

        {invalidData && (
          <ErrorLabelWrapper>
            <ErrorLabel>Invalid data passed</ErrorLabel>
          </ErrorLabelWrapper>
        )}

        <FormGroup>
          <ButtonWrapper>
            <DeleteButton type="button" onClick={deletePetPopup}>
              Delete pet
            </DeleteButton>
          </ButtonWrapper>
        </FormGroup>
      </Form>

      {showPopUp ? (
        <PopupWindow>
          <Form>
            <FormGroup className="form__group">
              <FormInput
                type="text"
                className="form__field"
                placeholder="Enter pet name"
                name="deleteName"
                id="deleteName"
                onChange={handleDeletePetNameChange}
              />
              <FormLabel htmlFor="deleteName" className="form__label">
                Enter pet name
              </FormLabel>
            </FormGroup>

            {errorFlag ? (
              <ErrorLabel style={{ marginTop: '10px' }}>
                {errorToLabelText}
              </ErrorLabel>
            ) : undefined}

            <ButtonWrapper>
              <LoginButton
                onClick={deletePetPopup}
                type="button"
                style={{ marginTop: '10px' }}
              >
                Close
              </LoginButton>
            </ButtonWrapper>
            <ButtonWrapper
              style={{ marginTop: '10px' }}
              type="button"
              onClick={deletePetHandler}
            >
              <DeleteButton>Delete</DeleteButton>
            </ButtonWrapper>
          </Form>
        </PopupWindow>
      ) : undefined}
    </UserContent>
  );
};

export default EditPet;
