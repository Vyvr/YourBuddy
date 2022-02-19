/** @format */

import styled from "styled-components";
import { COLORS } from "../../colors";

const TableHead = styled.table`
  width: 90%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
`;

const Table = styled.table`
  width: 90%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;

  table-layout: fixed;
  border-radius: 5px;
  font-size: 18px;
`;

const Scrollable = styled.div`
  width: 90%;
  max-height: 150px;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
`;

const Thead = styled.thead`
  background-color: ${COLORS.special_button_font};
  color: white;
`;

const Tr = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: ${COLORS.special_button};
  }
`;

export { Table, TableHead, Thead, Tr, Scrollable };
