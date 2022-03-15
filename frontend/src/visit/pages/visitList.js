/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import VetContent from "../../shared/components/content/VetContent";

import getCookieValue from "../../scripts/getCookieValue";
import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";
import SearchVisit from "../components/SearchVisit";

const VisitList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVisits, setLoadedVisits] = useState();
  const [searchData, setSearchData] = useState();

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/api/visit/get-vet-visits/" +
  //           getCookieValue("user_id")
  //       );
  //       const responseData = await response.json();
  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }

  //       if (responseData.visits.length !== 0) {
  //         setLoadedVisits(responseData.visits);
  //       }
  //     } catch (err) {
  //       throw new Error(err.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   sendRequest();
  // }, []);

  const history = useHistory();

  const handleRowClick = (
    _id,
    _ownerName,
    _patientName,
    _term,
    _description,
    _patient,
    _vetName,
    _vetId
  ) => {
    history.push("/vet/visit-details/" + _id, {
      id: _id,
      ownerName: _ownerName,
      patientName: _patientName,
      term: _term,
      description: _description,
      patient: _patient,
      vetName: _vetName,
      vetId: _vetId,
    });
  };

  const fromSearchComponent = (data) => {
    setSearchData(data);
  };

  return (
    <VetContent>
      <SearchVisit getSearchData={fromSearchComponent} />
      <Table className="visit-list-table">
        <Thead>
          <tr>
            <th>Owner</th>
            <th>Patient</th>
            <th>Description</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Clinic</th>
            <th>Status</th>
          </tr>
        </Thead>
        <tbody>
          {console.log(searchData)}
          {searchData
            ? searchData
                .map((v) => {
                  return (
                    <Tr
                      key={v._id}
                      id={v.id}
                      onClick={() => {
                        handleRowClick(
                          v._id,
                          v.ownerName,
                          v.patientName,
                          v.term,
                          v.description,
                          v.patient,
                          v.vetName,
                          v.vet
                        );
                      }}
                    >
                      <td>{v.ownerName}</td>
                      <td>{v.patientName}</td>
                      <td>{v.description}</td>
                      <td>{v.term}</td>
                      <td>{v.hour}</td>
                      <td>{v.clinicName}</td>
                      <td>{v.status}</td>
                    </Tr>
                  );
                })
                .reverse()
            : undefined}
        </tbody>
      </Table>
    </VetContent>
  );
};

export default VisitList;
