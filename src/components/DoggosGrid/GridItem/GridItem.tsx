import React, { useContext, useState } from "react";
import { DoggosContainerContext, IDog } from "../../DoggosContainer/DoggosContainerContext";
import { FiHeart } from "react-icons/fi";

import './GridItem.scss';

interface GridItemProps {
  dog: IDog,
  onFavorite: (dog: IDog) => void,
}

export default function GridItem({ dog, onFavorite }: GridItemProps) {
  const { selectedDogs } = useContext(DoggosContainerContext);

  const [hasBeenFavorited, setHasBeenFavorited] = useState(selectedDogs.find((d: IDog) => d.id === dog.id) !== undefined);

  function handleFavorite() {
    setHasBeenFavorited(!hasBeenFavorited);
    onFavorite(dog);
  }

  // NOTE: persist button style 
  const shouldApplyButtonStyle = () =>
    hasBeenFavorited || selectedDogs.find((d: IDog) => d.id === dog.id);

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
              className={`btn--fav ${ shouldApplyButtonStyle() ? 'btn--fav-selected' : ''}`}
              onClick={handleFavorite}>
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
