import React from 'react';
import Title from '../components/Speakers/Title';
import Content from '../components/Speakers/Content';
import './Speakers.css';
import Content2 from '../components/Speakers/Content2';

const Speaker = ({ name, para1, para2, picture, designation, bg }) => {
  return (
    <div className='panel'>
      {/* <Title /> */}
      {/* <Content bg={bg} name={name} para1={para1} para2={para2} picture={picture} designation={designation} /> */} 
      <Content2 />
    </div>
  );
};

export default Speaker;
