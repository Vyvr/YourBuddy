/** @format */

import React, { useEffect, useState } from "react";

import UserContent from "../../shared/components/content/UserContent";
import UserProfile from "./../components/userProfile";
import PetCard from "../../pet/components/petCard";

import "./dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPets, setLoadedPets] = useState();

  useEffect(() => {
    setName(sessionStorage.getItem("name"));
    setSurname(sessionStorage.getItem("surname"));

    const sendRequest = async () => {
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
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

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
