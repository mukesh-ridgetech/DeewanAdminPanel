import React from 'react';
// import './Style/Card.css';

const CardContainer = () => {
  const cards = [
    { id: 1, title: "Card 1", description: "This is the first card.", image: "https://via.placeholder.com/300" },
    { id: 2, title: "Card 2", description: "This is the second card.", image: "https://via.placeholder.com/300" },
    { id: 3, title: "Card 3", description: "This is the third card.", image: "https://via.placeholder.com/300" },
    { id: 4, title: "Card 4", description: "This is the fourth card.", image: "https://via.placeholder.com/300" },
    { id: 5, title: "Card 5", description: "This is the fifth card.", image: "https://via.placeholder.com/300" },
    { id: 6, title: "Card 6", description: "This is the sixth card.", image: "https://via.placeholder.com/300" },
    { id: 7, title: "Card 7", description: "This is the seventh card.", image: "https://via.placeholder.com/300" },
  ];

  return (
    <div className="card-container">
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-content">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
