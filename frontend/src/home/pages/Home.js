/** @format */

import React from "react";

import HomeContent from "../../shared/components/content/HomeContent";
import PetCard from "../../pet/components/petCard";

const Home = () => {
  return (
    <div className="home-content">
      <HomeContent>
        <PetCard
          id={132}
          key={132}
          name={"Burek"}
          age={3}
          weight={2}
          owner={123}
        />
      </HomeContent>
    </div>
  );
};

export default Home;
