/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import HomeContent from "../../shared/components/content/HomeContent";

import "./slides.css";

const imagesPath = [
  "https://images.pexels.com/photos/1139793/pexels-photo-1139793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://media.istockphoto.com/photos/young-man-interacts-with-his-pets-in-the-garden-under-a-mosquito-net-picture-id1249415002",
];

const ImgContent = styled.div`
  position: absolute;
  bottom: 0;
  top: 360px;
  display: flex;
  width: 100%;
  //height: 100vh;
  flex-grow: 1;
  justify-content: space-between;
`;

const ImgWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const TopText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 90px;
  font-size: 30px; ;
`;

const LogoText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  font-family: "Brush Script MT";
  font-weight: bold;
  font-size: 90px;
  font-family: "Cookie", cursive;
`;

const Home = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const handleAnimation = () => {
      setFrame((frame) => (frame + 1) % imagesPath.length);
    };
    const interval = setInterval(handleAnimation, 4000); // 300 ms is pretty short. Did you mean 3000?
    return () => clearInterval(interval);
  }, []);

  return (
    <HomeContent>
      <TextWrapper>
        <TopText>
          <label>Take care of your pets</label>
        </TopText>
        <TopText>
          <label>with</label>
        </TopText>
        <LogoText>
          <label>Your Buddy</label>
        </LogoText>
      </TextWrapper>

      <ImgContent>
        <ImgWrapper>
          <TransitionGroup>
            <CSSTransition
              key={imagesPath[frame]}
              timeout={1000}
              classNames="slide-right"
            >
              <Img src={imagesPath[frame]} />
            </CSSTransition>
          </TransitionGroup>
        </ImgWrapper>

        <ImgWrapper>
          <TransitionGroup>
            <CSSTransition
              key={imagesPath[frame]}
              timeout={1000}
              classNames="slide-left"
            >
              <Img src={imagesPath[frame]} />
            </CSSTransition>
          </TransitionGroup>
        </ImgWrapper>
      </ImgContent>
    </HomeContent>
  );
};

export default Home;
