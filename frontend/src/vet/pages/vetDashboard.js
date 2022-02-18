/** @format */

import React, { useEffect, useState } from "react";

import VetContent from "../../shared/components/content/VetContent";
import UserContent from "../../shared/components/content/UserContent";
import VetProfile from "../components/vetProfile";
import NewVisits from "../components/newVisits";

import getCookieValue from "../../scripts/getCookieValue";

const VetDashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userTypes, setUserTypes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVisits, setLoadedVisits] = useState();

  useEffect(() => {
    setName(getCookieValue("userName"));
    setSurname(getCookieValue("userSurname"));

    const getUserTypes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/get-user-types/" +
            getCookieValue("user_id")
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUserTypes(responseData);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };

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
    getUserTypes();
  }, []);

  const becomeVetHandler = async () => {
    try {
      await fetch("http://localhost:5000/api/user/add-user-vet-type", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          id: getCookieValue("user_id"),
        }),
      });
    } catch (err) {
      throw new Error(err.message);
    }
    window.location.reload(false);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!isLoading && userTypes && !userTypes.includes("vet")) {
    return (
      <UserContent>
        <div className="not-a-vet-div">
          <button
            className="become-a-vet-btn"
            type="submit"
            onClick={becomeVetHandler}
          >
            Become a vet
          </button>
        </div>
      </UserContent>
    );
  }

  return (
    <div>
      <VetContent>
        <VetProfile className="vet-profile" name={name} surname={surname} />
        {!isLoading ? <NewVisits loadedVisits={loadedVisits} /> : undefined}
      </VetContent>
    </div>
  );
};

export default VetDashboard;
