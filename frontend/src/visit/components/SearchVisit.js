/** @format */

import React, { useRef, useState, useEffect } from "react";

import getCookieValue from "../../scripts/getCookieValue";

import {
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton as Button,
  Checkbox,
  CheckboxWrapper,
  CheckboxInsideWrapper,
  CheckboxLabel,
} from "../../shared/components/forms/formTemplate";
import SearchWrapper from "../../shared/components/SearchWrapper";

import searchByOwner from "../scripts/searchByOwner";
import searchByClinic from "../scripts/searchByClinic";
import searchByDate from "../scripts/searchByDate";
import searchByPatient from "../scripts/searchByPatient";
import searchAllVisits from "../scripts/searchAllVisits";

const SearchVisit = ({ getSearchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedVisits, setSearchedVisits] = useState();

  const owner = useRef(null);
  const patient = useRef(null);
  const date = useRef(null);
  const clinic = useRef(null);
  const allVisits = useRef(null);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/visit/get-vet-visits/" +
            getCookieValue("user_id")
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        if (responseData.visits.length !== 0) {
          getSearchData(responseData.visits);
        }
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const searchVisit = async (data) => {
    if (owner.current.checked) {
      const regEx = "[A-Za-z]+|[A-Za-z ][A-Za-z]";
      if (!data || !data.match(regEx)) return;
      data = data.replace(" ", "-").toLowerCase();

      searchByOwner(data).then((val) => getSearchData(val));
    } else if (patient.current.checked) {
      searchByPatient(data).then((val) => getSearchData(val));
    } else if (date.current.checked) {
      searchByDate(data).then((val) => getSearchData(val));
    } else if (clinic.current.checked) {
      searchByClinic(data).then((val) => getSearchData(val));
    } else {
      searchAllVisits().then((val) => getSearchData(val));
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleOwnerChange = () => {
    patient.current.checked = false;
    date.current.checked = false;
    clinic.current.checked = false;
    allVisits.current.checked = false;
    owner.current.checked = true;
  };
  const handlePatientChange = () => {
    patient.current.checked = true;
    date.current.checked = false;
    clinic.current.checked = false;
    allVisits.current.checked = false;
    owner.current.checked = false;
  };
  const handleDateChange = () => {
    patient.current.checked = false;
    date.current.checked = true;
    clinic.current.checked = false;
    allVisits.current.checked = false;
    owner.current.checked = false;
  };
  const handleClinicChange = () => {
    patient.current.checked = false;
    date.current.checked = false;
    clinic.current.checked = true;
    allVisits.current.checked = false;
    owner.current.checked = false;
  };
  const handleAllVisitsChange = () => {
    patient.current.checked = false;
    date.current.checked = false;
    clinic.current.checked = false;
    allVisits.current.checked = true;
    owner.current.checked = false;
  };

  return (
    <SearchWrapper>
      <FormGroup>
        <FormInput
          type="input"
          className="field"
          placeholder="Search"
          name="search"
          id="search"
          onChange={handleSearchChange}
          onKeyUp={(e) => {
            if (e.keyCode === 13) searchVisit(searchText);
          }}
        />
        <FormLabel htmlFor="search" className="label">
          Search
        </FormLabel>
      </FormGroup>

      <FormGroup style={{ width: "50%" }}>
        <CheckboxWrapper>
          <CheckboxWrapper>
            <CheckboxLabel>Search by:</CheckboxLabel>

            <CheckboxInsideWrapper>
              <CheckboxLabel>Owner</CheckboxLabel>
              <Checkbox
                type="checkbox"
                onChange={handleOwnerChange}
                ref={owner}
              />
            </CheckboxInsideWrapper>

            <CheckboxInsideWrapper>
              <CheckboxLabel>Patient</CheckboxLabel>
              <Checkbox
                type="checkbox"
                onChange={handlePatientChange}
                ref={patient}
              />
            </CheckboxInsideWrapper>

            <CheckboxInsideWrapper>
              <CheckboxLabel>Date</CheckboxLabel>
              <Checkbox
                type="checkbox"
                onChange={handleDateChange}
                ref={date}
              />
            </CheckboxInsideWrapper>

            <CheckboxInsideWrapper>
              <CheckboxLabel>Clinic</CheckboxLabel>
              <Checkbox
                type="checkbox"
                onChange={handleClinicChange}
                ref={clinic}
              />
            </CheckboxInsideWrapper>

            <CheckboxInsideWrapper>
              <CheckboxLabel>Show all visits</CheckboxLabel>
              <Checkbox
                type="checkbox"
                onChange={handleAllVisitsChange}
                ref={allVisits}
                defaultChecked
              />
            </CheckboxInsideWrapper>
          </CheckboxWrapper>
        </CheckboxWrapper>
      </FormGroup>

      <FormGroup>
        <ButtonWrapper>
          <Button onClick={() => searchVisit(searchText)}>Search visit</Button>
        </ButtonWrapper>
      </FormGroup>
    </SearchWrapper>
  );
};

export default SearchVisit;
