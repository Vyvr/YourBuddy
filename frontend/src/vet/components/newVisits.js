/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  row-gap: 10px;
  margin-left: auto;
  margin-top: auto;

  width: calc(100% - 340px);
  height: 100%;
`;

const NewVisits = (props) => {
  return (
    <Wrapper>
      <table className="visit-list-table">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Patient</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {props.loadedVisits
            ?.map((v) => {
              return (
                <tr key={v.id} id={v.id}>
                  <td>{v.ownerName}</td>
                  <td>{v.patientName}</td>
                  <td>{v.term}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default NewVisits;
