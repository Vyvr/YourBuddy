/** @format */

import React, { useEffect, useState } from "react";

import UserContent from "../../shared/components/content/UserContent";
import UserProfile from "../components/userProfile";
import PetCard from "../../pet/components/petCard";

import getCookieValue from "../../scripts/getCookieValue";

import "./userDashboard.css";

const UserDashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPets, setLoadedPets] = useState();

  useEffect(() => {
    setName(getCookieValue("userName"));
    setSurname(getCookieValue("userSurname"));
    setUid(getCookieValue("user_id"));
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

  return (
    <UserContent>
      <div className="dashboard-content">
        <UserProfile
          className="user-profile"
          name={name}
          surname={surname}
          userId={uid}
        />
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
                  owner={pet.owner}
                />
              );
            })}
        </div>
      </div>
    </UserContent>
  );
};

export default UserDashboard;
