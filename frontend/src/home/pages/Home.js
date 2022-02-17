/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import HomeContent from "../../shared/components/content/HomeContent";

import "./slides.css";

const imagesPath = [
  "https://images.pexels.com/photos/1139793/pexels-photo-1139793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/5483456/pexels-photo-5483456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5745219/pexels-photo-5745219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/9632115/pexels-photo-9632115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

const ImgContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ImgWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 800px;
  height: 530px;
`;

const Img = styled.img`
  position: absolute;
  width: 500px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  margin-top: 40px;
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
    <div className="home-content">
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
    </div>
  );
};

export default Home;
