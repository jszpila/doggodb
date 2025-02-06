import React, { useState } from "react";
import { IDog } from "../../DoggosContainer/DoggosContainerContext";
import { FiHeart } from "react-icons/fi";

import './GridItem.scss';

interface GridItemProps {
  dog: IDog,
  onFavorite: (dog: IDog) => void,
}

// TODO: implement onClicks
export default function GridItem({ dog, onFavorite }: GridItemProps) {
  const [hasBeenFavorited, setHasBeenFavorited] = useState(false);

  function handleFavorite() {
    setHasBeenFavorited(!hasBeenFavorited);
    onFavorite(dog);
  }

  return (
    <div className="grid-item">
      <div className="grid-item__wrapper">
        <img
          className="grid-item__pic"
          src={dog.img}
          alt={`${dog.name} / ${dog.age} / ${dog.breed} / ${dog.zip_code} `}
        />
        <div className="grid-item__info-wrapper">
          <div className="grid-item__info">
            <h4 className="grid-item__name">{dog.name}</h4>
            <span>
              {dog.age} | {dog.breed} | {dog.zip_code}
            </span>
          </div>
          <div className="grid-item__buttons-container">
            <button 
              className={`btn--fav ${ hasBeenFavorited ? 'btn--fav-selected' : ''}`}
              onClick={handleFavorite}>
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
