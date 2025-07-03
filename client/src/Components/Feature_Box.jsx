import React from 'react';
import '../Components_CSS/Feature_Boxc.css';


const FeatureBox = ({ title, description, icon }) => {
  return (
    <div className="heroic-profile-box">
      <div className="icon-circle">
        <img src={icon} alt="" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureBox;