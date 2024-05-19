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
  const getImage = (veredict) => {
    if (veredict.includes('parcialmente')) {
      if (veredict.includes('verdadera')) {
        return bueno;
      } else if (veredict.includes('falsa')) {
        return malo;
      }
    }
    // Imagen por defecto
    return neutro;
  };
  return (
    <div>
      {data.map((item, index) => (
        <div className="tarjeta" key={index} onClick={() => handleCardClick(index)}>
          {flippedIndex === index ? (
            <div className="tarjeta-content flipped">
                <p className="sourc"><span className="fuenteortiz">Fuentes</span> {item.sources}</p>
            </div>
          ) : (
            <div className="tarjeta-content">
              <p className="factopeq">{item.statement}</p>
              <p className="tirando-factos">{item.veredict}</p>
              <img src={getImage(item.veredict)} className="buenoi" alt="veredicto" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tarjetas;
