/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Header from "../../shared/components/navigation/HomeHeader";
import UserCard from "../components/userCard";

import "./userProfile.css";

const UserProfile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/user");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      <Header>
        <ul>
          <li>
            <NavLink to="/">BACK</NavLink>
          </li>
        </ul>
      </Header>
      <div className="center">
        <ul>
          {!isLoading &&
            loadedUsers &&
            loadedUsers.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  name={user.name}
                  surname={user.surname}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
