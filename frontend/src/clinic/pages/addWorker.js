/** @format */

import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VetContent from "./../../shared/components/content/VetContent";

const Input = styled.input`
  display: block;
  height: 20px;
  width: 280px;
  padding-left: 20px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;

  border: none;
  background-color: #c95226;
  color: #ffff;
  border-radius: 20px;
  transition-duration: 0.4s;

  &:placeholder {
    color: rgba(255, 255, 255, 0.774);
  }

  &:focus {
    background-color: #e93e00cc;
    color: white;
    outline: 3px solid #c95226;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
`;

const DisabledButton = styled.button`
  width: 100%;
  padding: 10px;

  border: none;
  text-decoration: none;
  background-color: #c95226;
  color: #ffff;
  border-radius: 20px;
  cursor: not-allowed;

  &:hover {
    background-color: #c95226;
    color: white;
  }
`;

const Table = styled.table`
  margin-top: 10px;
  width: 100%;
  border-collapse: collapse;
`;

const HireButton = styled.button``;

const AddWorker = (props) => {
  const [inputText, setInputText] = useState("");
  const [potentialWorkers, setPotentialWorkers] = useState(null);
  const [loadedWorkers, setLoadedWorkers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const getClinicWorkers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/clinic/get-all-clinic-vets/" +
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
  }, []);

  const findWorker = async (data) => {
    setIsLoading(true);
    data = data.replace(" ", "-").toLowerCase();
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/get-users-by-name-and-surname/" + data
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setPotentialWorkers(responseData.existingUsers);
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
      await fetch("http://localhost:5000/api/clinic/add-worker", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          uid: workerId,
          cid: clinicId,
        }),
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <VetContent>
      <Input onChange={handleInputChange} />
      <SubmitButton onClick={() => findWorker(inputText)}>Find</SubmitButton>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>mail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            !isLoading &&
            potentialWorkers &&
            potentialWorkers.map((worker) => {
              return (
                <tr key={worker._id}>
                  <td>{worker.name}</td>
                  <td>{worker.surname}</td>
                  <td>{worker.mail}</td>
                  <td>
                    {loadedWorkers.filter(e => e._id === worker._id).length > 0 ? (
                      <DisabledButton disabled={true}>Hired</DisabledButton>
                    ) : (
                      <HireButton
                        onClick={() =>
                          handleHireWorker(location.state.id, worker._id) &&
                          window.location.reload(false)
                        }
                      >
                        Hire
                      </HireButton>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </VetContent>
  );
};
export default AddWorker;
