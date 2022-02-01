/** @format */

import React, { useEffect, useState } from "react";

import AuthContent from "../../shared/components/content/AuthContent";
import UserCard from "../components/userCard";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <AuthContent>
      <div className="center">
        <ul>
          {!isLoading &&
            loadedUsers &&
            loadedUsers.map((user) => {
              return (
                <UserCard
                  key={user._id}
                  id={user._id}
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
