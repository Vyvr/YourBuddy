/** @format */

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLORS } from "../../shared/colors";
import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";

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

const NewVisits = (props) => {
  const history = useHistory();

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
          {props.loadedVisits
            ? props.loadedVisits
                ?.map((v) => {
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
                      <td>{v.status}</td>
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
