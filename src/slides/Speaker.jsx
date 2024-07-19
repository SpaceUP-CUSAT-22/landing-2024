import React from 'react';
import './Speaker.css';

const Speaker = ({ name, para1, para2, picture, designation }) => {
  return (
    <>
      <div className="fixed-title">
        <h1>Speakers</h1>
      </div>
      <div className="panel2">
        <div className="speaker-panel">
          <div className="left-text">
            <p>{para1}</p>
          </div>
          <div className="picture-container">
          <img src='jane.jpg' alt={name} className="speaker-image" />
            <h2>{name}</h2>
            <h3>{designation}</h3>
          </div>
          <div className="right-text">
            <p>{para2}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Speaker;
