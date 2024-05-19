import React, { useState } from 'react';
import data from './ejemplo.json';
import bueno from './images/check.png';
import malo from './images/delete.png';
import neutro from './images/neutro.png';

const Tarjetas = () => {
  // Define un estado para manejar si la tarjeta está volteada
  const [flippedIndex, setFlippedIndex] = useState(null);

  // Manejar el clic en la tarjeta
  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div className="tarjeta" key={index} onClick={() => handleCardClick(index)}>
          {flippedIndex === index ? (
            <div className="tarjeta-content flipped">
              <p className="sourc">{item.sources}</p>
            </div>
          ) : (
            <div className="tarjeta-content">
              <p className="factopeq">{item.statement}</p>
              <img src={bueno} className="bueno" alt="bueno" />
              <p className="tirando-factos">{item.veredict}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tarjetas;
