import React from "react";
import "../Style/MasterCards.css";

const MasterCards = ({ setSelectedTab }) => {
  const handleCardClick = (tabKey) => {
    setSelectedTab(tabKey);
  };

  return (
    <div className="master-cards">
      <div className="card" onClick={() => handleCardClick("amenties-master")}>
        Amenties
      </div>

      <div className="card" onClick={() => handleCardClick("builder-master")}>
        Builders
      </div>

      <div className="card" onClick={() => handleCardClick("location-master")}>
        Location
      </div>

      <div className="card" onClick={() => handleCardClick("overview-master")}>
        Overview
      </div>

      <div className="card" onClick={() => handleCardClick("furnished-master")}>
        Funishied
      </div>

      <div className="card" onClick={() => handleCardClick("parking-master")}>
        Parking
      </div>

      <div className="card" onClick={() => handleCardClick("flooring-master")}>
        Flooring
      </div>

      <div className="card" onClick={() => handleCardClick("fencing-master")}>
        Fencing
      </div>

      {/* <div className="card" onClick={() => handleCardClick('neighbourhood-master')}>
            Neighbourhood
            </div> */}

      {/* <div className="card" onClick={() => handleCardClick('transition-master')}>
             Transition
            </div> */}

      {/* Neighbourhood */}
    </div>
  );
};

export default MasterCards;
