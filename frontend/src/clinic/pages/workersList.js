/** @format */

import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { COLORS } from "../../shared/colors";
import VetContent from "./../../shared/components/content/VetContent";
import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";

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

const WorkersList = (props) => {
  const [loadedWorkers, setLoadedWorkers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
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
  }, [location.state.id, rerender]);

  const dismissWorker = async (clinicId, workerId) => {
    try {
      await fetch("http://localhost:5000/api/clinic/dismiss-worker", {
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
    setRerender(!rerender);
  };

  return (
    <VetContent>
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
            loadedWorkers &&
            loadedWorkers.map((worker) => {
              return (
                <Tr key={worker._id}>
                  <td>{worker.name}</td>
                  <td>{worker.surname}</td>
                  <td>{worker.mail}</td>
                  <td>
                    <DismissButton
                      onClick={() => {
                        dismissWorker(location.state.id, worker._id);
                      }}
                    >
                      Dismiss
                    </DismissButton>
                  </td>
                </Tr>
              );
            })}
        </tbody>
      </Table>
    </VetContent>
  );
};
export default WorkersList;
