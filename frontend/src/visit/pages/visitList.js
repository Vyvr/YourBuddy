/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import VetContent from "../../shared/components/content/VetContent";

import getCookieValue from "../../scripts/getCookieValue";

import "./visitList.css";

const VisitList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVisits, setLoadedVisits] = useState();
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
          setLoadedVisits(responseData.visits);
        }
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

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
    <VetContent>
      <table className="visit-list-table">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Patient</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            loadedVisits
              ?.map((v) => {
                return (
                  <tr
                    key={v.id}
                    id={v.id}
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
                  </tr>
                );
              })
              .reverse()}
        </tbody>
      </table>
    </VetContent>
  );
};

export default VisitList;
