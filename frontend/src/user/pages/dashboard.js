/** @format */

import React, { useEffect, useState } from "react";

import NotLoggedIn from "../../shared/pages/notLoggedIn";
import UserContent from "../../shared/components/content/UserContent";
import UserProfile from "./../components/userProfile";
import PetCard from "../../pet/components/petCard";

import getCookieValue from "./../../scripts/getCookieValue";

import "./dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPets, setLoadedPets] = useState();

  useEffect(() => {
    setName(getCookieValue("name"));
    setSurname(getCookieValue("surname"));
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/pet/" + getCookieValue("userId")
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        if (responseData.pets.length !== 0) {
          setLoadedPets(responseData.pets);
        }
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  if (getCookieValue("loggedIn") !== "true") {
    return <NotLoggedIn />;
  }

  return (
    <div>
      <UserContent>
        <div className="dashboard-content">
          <UserProfile className="user-profile" name={name} surname={surname} />
          <div className="pet-list">
            {!isLoading &&
              loadedPets &&
              loadedPets.map((pet) => {
                return (
                  <PetCard
                    id={pet.id}
                    key={pet.id}
                    name={pet.name}
                    age={pet.age}
                    weight={pet.weight}
                  />
                );
              })}
          </div>
        </div>
      </UserContent>
    </div>
  );
};

export default Dashboard;
