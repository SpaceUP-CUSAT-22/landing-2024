import React from 'react';
import Title from '../components/Speakers/Title';
import Content from '../components/Speakers/Content';
// import './Speaker.css';

const Speaker = ({ name, para1, para2, picture, designation }) => {
  return (
    <>
      <Title />
      <Content name={name} para1={para1} para2={para2} picture={picture} designation={designation} />
    </>
  );
};

export default Speaker;
