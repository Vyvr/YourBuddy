/** @format */

import React from 'react';

import Content from './Content';
import HomeHeader from '../navigation/HomeHeader';

const HomeContent = (props) => {
  return (
    <React.Fragment>
      <HomeHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 60px)',
          width: '100%',
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default HomeContent;
