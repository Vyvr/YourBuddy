/** @format */

import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { COLORS } from '../../shared/colors';
import VetContent from './../../shared/components/content/VetContent';
import {
  Table,
  Thead,
  Tr,
} from '../../shared/components/table/tableTemplate';
import {
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
} from '../../shared/components/forms/formTemplate';
import SearchWrapper from '../../shared/components/SearchWrapper';

const DismissButton = styled.button`
  width: 100%;
  padding: 10px;

  border: none;
  text-decoration: none;
  background-color: ${COLORS.delete_button};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${COLORS.delete_button_hover};
    color: white;
    color: white;
  }
`;

const HireButton = styled.button`
  width: 100%;
  padding: 10px;

  border: none;
  text-decoration: none;
  background-color: ${COLORS.special_button};
  color: ${COLORS.special_button_font};
  font-weight: bold;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.special_button_hover};
    color: ${COLORS.special_button_font_hover};
    color: white;
  }
`;

const AddWorker = (props) => {
  const [inputText, setInputText] = useState('');
  const [potentialWorkers, setPotentialWorkers] = useState(null);
  const [loadedWorkers, setLoadedWorkers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const getClinicWorkers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:5000/api/clinic/get-all-clinic-vets/' +
            location.state.id
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedWorkers(responseData.workers);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getClinicWorkers();
  }, [location.state.id, rerender]);

  const findWorker = async (data) => {
    const regEx = '[A-Za-z]+|[A-Za-z ][A-Za-z]';
    if (!data || !data.match(regEx)) return;
    setIsLoading(true);
    data = data.replace(' ', '-').toLowerCase();
    try {
      const response = await fetch(
        'http://localhost:5000/api/user/get-users-by-name-and-surname/' +
          data
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const filtered = responseData.existingUsers.filter((worker) =>
        worker.type.includes('vet')
      );
      setPotentialWorkers(filtered);
    } catch (err) {
      throw new Error(err.message);
    }
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleHireWorker = async (clinicId, workerId) => {
    try {
      await fetch('http://localhost:5000/api/clinic/add-worker', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },

        body: JSON.stringify({
          uid: workerId,
          cid: clinicId,
        }),
      });
    } catch (err) {
      throw new Error(err.message);
    }
    setRerender(!rerender);
  };

  const dismissWorker = async (clinicId, workerId) => {
    try {
      await fetch('http://localhost:5000/api/clinic/dismiss-worker', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },

        body: JSON.stringify({
          uid: workerId,
          cid: clinicId,
        }),
      });
    } catch (err) {
      throw new Error(err.message);
    }
    setRerender(!rerender);
  };

  return (
    <VetContent>
      <SearchWrapper>
        <FormGroup>
          <FormInput
            type="input"
            className="field"
            placeholder="Find vets"
            name="find"
            id="find"
            onChange={handleInputChange}
            onKeyUp={(e) => {
              if (e.keyCode === 13) findWorker(inputText);
            }}
          />
          <FormLabel htmlFor="find" className="label">
            Find vets
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <ButtonWrapper>
            <LoginButton onClick={() => findWorker(inputText)}>
              Find
            </LoginButton>
          </ButtonWrapper>
        </FormGroup>
      </SearchWrapper>

      <Table>
        <Thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>mail</th>
            <th></th>
          </tr>
        </Thead>
        <tbody>
          {!isLoading &&
            potentialWorkers &&
            potentialWorkers.map((worker) => {
              return (
                <Tr key={worker._id}>
                  <td>{worker.name}</td>
                  <td>{worker.surname}</td>
                  <td>{worker.mail}</td>
                  <td>
                    {loadedWorkers.filter((e) => e._id === worker._id)
                      .length > 0 ? (
                      <DismissButton
                        onClick={() => {
                          dismissWorker(
                            location.state.id,
                            worker._id
                          );
                        }}
                      >
                        Dismiss
                      </DismissButton>
                    ) : (
                      <HireButton
                        onClick={() => {
                          handleHireWorker(
                            location.state.id,
                            worker._id
                          );
                        }}
                      >
                        Hire
                      </HireButton>
                    )}
                  </td>
                </Tr>
              );
            })}
        </tbody>
      </Table>
    </VetContent>
  );
};
export default AddWorker;
