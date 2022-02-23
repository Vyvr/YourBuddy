/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { COLORS } from "../../shared/colors";
import UserContent from "../../shared/components/content/UserContent";
import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledNameLabel = styled.label`
  color: ${COLORS.special_button_font};
  font-weight: bold;
  align-self: center;
  font-size: 1.3rem;
  cursor: text;
  margin-bottom: 16px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 30%;
  align-items: center;
`;

const PetInfo = () => {
  const location = useLocation();
  return (
    <UserContent>
      <Wrapper>
        <NameWrapper className="form__group">
          <StyledNameLabel className="form__label">
            {location.state.name} vaccines list
          </StyledNameLabel>
        </NameWrapper>
      </Wrapper>

      <Table>
        <Thead>
          <th>Vaccine</th>
          <th>Date</th>
        </Thead>

        <tbody>
          {location.state.vaccinations.map((v) => {
            return (
              <Tr key={v.vaccination}>
                <td>{v.vaccination}</td>
                <td>{v.term}</td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </UserContent>
  );
};

export default PetInfo;
