/** @format */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import HomeContent from '../../shared/components/content/HomeContent';
import imagesPath from '../imagesPath';

import './slides.css';

const ImgContent = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
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
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`;

const LogoText = styled.div`
  font-family: 'Brush Script MT';
  font-weight: bold;
  font-size: 90px;
  font-family: 'Cookie', cursive;
`;

const Home = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const handleAnimation = () => {
      setFrame((frame) => (frame + 1) % imagesPath.length);
    };
    const interval = setInterval(handleAnimation, 6000); // 300 ms is pretty short. Did you mean 3000?
    return () => clearInterval(interval);
  }, []);

  return (
    <HomeContent style={{ display: 'flex', flexDirection: 'row' }}>
      <TextWrapper>
        <LogoText>Take care</LogoText>
        <LogoText>of your pets</LogoText>
        <LogoText>with</LogoText>
        <LogoText>Your Buddy</LogoText>
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
      </ImgContent>
    </HomeContent>
  );
};

export default Home;
