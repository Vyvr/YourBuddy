/** @format */

import React, { useEffect, useState } from "react";

import NotLoggedIn from "../../shared/pages/notLoggedIn";
import VetContent from "../../shared/components/content/VetContent";
import VetProfile from "./../components/vetProfile";

import getCookieValue from "./../../scripts/getCookieValue";

import "./dashboard.css";

const Dashboard = () => {
  //   const [name, setName] = useState("");
  //   const [surname, setSurname] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [loadedPets, setLoadedPets] = useState();

  //   useEffect(() => {
  //     setName(getCookieValue("name"));
  //     setSurname(getCookieValue("surname"));
  //   }, []);

  //   useEffect(() => {
  //     const sendRequest = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await fetch(
  //           "http://localhost:5000/api/pet/" + getCookieValue("userId")
  //         );
  //         const responseData = await response.json();
  //         if (!response.ok) {
  //           throw new Error(responseData.message);
  //         }

  //         if (responseData.pets.length !== 0) {
  //           setLoadedPets(responseData.pets);
  //         }
  //       } catch (err) {
  //         throw new Error(err.message);
  //       }
  //       setIsLoading(false);
  //     };
  //     sendRequest();
  //   }, []);

  //   if (getCookieValue("loggedIn") !== "true") {
  //     return <NotLoggedIn />;
  //   }

  return (
    <div>
      <VetContent>
        <div className="vet-dashboard-content">
          <VetProfile
            className="vet-profile"
            name="Testowy"
            surname="Weterynarz"
          />
        </div>
      </VetContent>
    </div>
  );
};

export default Dashboard;
