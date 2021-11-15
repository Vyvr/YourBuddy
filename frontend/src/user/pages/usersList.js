/** @format */

import React, { useEffect, useState } from "react";

import AuthContent from "../../shared/components/content/AuthContent";
import UserCard from "../components/userCard";

import "./usersList.css";

const UsersList = () => {
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
    <AuthContent>
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
    </AuthContent>
  );
};

export default UsersList;