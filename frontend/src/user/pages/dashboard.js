/** @format */

import React, { useEffect, useState } from "react";

import UserContent from "../../shared/components/content/UserContent";
import UserProfile from "./../components/userProfile";
import PetCard from "../../pet/components/petCard";

import "./dashboard.css";

const Dashboard = () => {
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPets, setLoadedPets] = useState();

  useEffect(() => {
    setName(sessionStorage.getItem("name"));
    setSurname(sessionStorage.getItem("surname"));

    const sendRequest = async () => {
      console.log("StartRequest");
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/pet/" + sessionStorage.getItem("userId")
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedPets(responseData.pets);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
    console.log(userId);
  }, []);

  const errorHandler = () => {
    setError(null);
  };

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
