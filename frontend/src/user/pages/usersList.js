/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AuthContent from "../../shared/components/content/AuthContent";
import UserCard from "../components/userCard";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

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
      <Content>
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
      </Content>
    </AuthContent>
  );
};

export default UsersList;
