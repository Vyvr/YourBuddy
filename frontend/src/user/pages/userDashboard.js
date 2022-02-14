/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UserContent from "../../shared/components/content/UserContent";
import UserProfile from "../components/userProfile";
import PetCard from "../../pet/components/petCard";
import { COLORS } from "../../shared/colors";

import getCookieValue from "../../scripts/getCookieValue";
import Content from "../../shared/components/content/Content";

const PetList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  row-gap: 10px;
  margin-left: auto;
  margin-top: 10px;

  width: calc(100% - 340px);
  height: 100%;
`;

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
        console.log(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <UserContent>
      <UserProfile
        className="user-profile"
        name={name}
        surname={surname}
        userId={uid}
      />
      <PetList className="pet-list">
        {!isLoading &&
          loadedPets &&
          loadedPets.map((pet) => {
            return (
              <PetCard
                id={pet.id}
                key={pet.id}
                name={pet.name}
                month={pet.age.month}
                year={pet.age.year}
                breed={pet.breed}
                weight={pet.weight}
                sex={pet.sex}
                owner={pet.owner}
              />
            );
          })}
      </PetList>
    </UserContent>
  );
};

export default UserDashboard;
