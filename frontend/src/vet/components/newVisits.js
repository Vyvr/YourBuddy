/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import getCookieValue from "../../scripts/getCookieValue";
import { COLORS } from "../../shared/colors";
import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";
import CheckIcon from "../../resources/icons/check-square.svg";
import ClockIcon from "../../resources/icons/clock.svg";
import CancelIcon from "../../resources/icons/x-square.svg";

const Wrapper = styled.div`
  margin-left: auto;
  margin-top: auto;
  width: calc(100% - 340px);
  height: 100%;
`;

const StyledLabel = styled.label`
  color: ${COLORS.special_button_font};
  font-weight: bold;
  align-self: center;
  font-size: 1.3rem;
  cursor: text;
  margin-bottom: 16px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
  align-items: center;
`;

const Edit = styled.button`
  opacity: 0.5;
  transition: 0.5s;
  all: unset;

  width: 20px;
  height: 20px;

  &:hover {
    opacity: 1;
  }
`;

const IconsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 20px);

  gap: 10px;
`;

const HourInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const NewVisits = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVisits, setLoadedVisits] = useState();
  const [rerender, setRerender] = useState(false);
  const [showHourInput, setShowHourInput] = useState(false);
  const [hourChange, setHourChange] = useState();

  useEffect(() => {
    const getVisits = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/visit/get-unsumbitted-vet-visits/" +
            getCookieValue("user_id")
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if (responseData.visits.length !== 0) {
          setLoadedVisits(responseData.visits);
        }
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    getVisits();

    return () => {
      setLoadedVisits();
    };
  }, [rerender]);

  const handleRowClick = (
    _id,
    _ownerName,
    _patientName,
    _term,
    _description,
    _patient
  ) => {
    history.push("/vet/visit-details/" + _id, {
      id: _id,
      ownerName: _ownerName,
      patientName: _patientName,
      term: _term,
      description: _description,
      patient: _patient,
    });
  };

  const handleStatusChange = async (status, visitId, hour) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/visit/change-visit-status",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            visitId,
            newStatus: status,
            hour,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err);
    }
    setRerender(!rerender);
  };

  const handleHourChange = (e) => {
    setHourChange(e.target.value);
    console.log(hourChange);
  };

  return (
    <Wrapper>
      <LabelWrapper>
        <StyledLabel>Upcomming visits</StyledLabel>
      </LabelWrapper>

      <Table className="visit-list-table">
        <Thead>
          <Tr>
            <th>Owner</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Status</th>
          </Tr>
        </Thead>
        <tbody>
          {!isLoading && loadedVisits
            ? loadedVisits
                .map((v) => {
                  return (
                    <Tr
                      key={v._id}
                      id={v._id}
                      onClick={() => {
                        handleRowClick(
                          v._id,
                          v.ownerName,
                          v.patientName,
                          v.term,
                          v.description,
                          v.patient
                        );
                      }}
                    >
                      <td>{v.ownerName}</td>
                      <td>{v.patientName}</td>
                      <td>{v.term}</td>
                      <td>{v.hour}</td>
                      <td
                        onClick={(event) => event.stopPropagation()}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {v.status === "pending" && (
                          <div>
                            <IconsWrapper>
                              <Edit
                                onClick={() =>
                                  handleStatusChange("accepted", v._id, v.hour)
                                }
                              >
                                <img
                                  src={CheckIcon}
                                  alt="checkIcon"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </Edit>

                              <Edit
                                onClick={() => setShowHourInput(!showHourInput)}
                              >
                                <img
                                  src={ClockIcon}
                                  alt="clockIcon"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </Edit>
                              <Edit
                                onClick={() =>
                                  handleStatusChange("canceled", v._id, v.hour)
                                }
                              >
                                <img
                                  src={CancelIcon}
                                  alt="cancelIcon"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </Edit>
                            </IconsWrapper>
                            {showHourInput && (
                              <HourInputWrapper>
                                <input
                                  type="time"
                                  defaultValue={v.hour}
                                  onChange={(e) => handleHourChange}
                                />
                                <Edit
                                  onClick={() =>
                                    handleStatusChange(
                                      "proposition",
                                      v._id,
                                      v.hour
                                    )
                                  }
                                >
                                  <img
                                    src={CheckIcon}
                                    alt="checkIcon"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </Edit>
                                <Edit
                                  onClick={() =>
                                    setShowHourInput(!showHourInput)
                                  }
                                >
                                  <img
                                    src={CancelIcon}
                                    alt="cancelIcon"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      marginLeft: "10px",
                                    }}
                                  />
                                </Edit>
                              </HourInputWrapper>
                            )}
                          </div>
                        )}
                        {v.status === "accepted" && "accepted"}
                        {v.status === "proposition" && "pending"}
                      </td>
                    </Tr>
                  );
                })
                .reverse()
            : undefined}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default NewVisits;
