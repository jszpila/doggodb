import React from "react";
import { IDog } from "../../DoggosContainer/DoggosContainerContext";
import { FiHeart } from "react-icons/fi";

import './GridItem.scss';

interface GridItemProps {
  dog: IDog,
}

// TODO: implement onClicks
export default function GridItem({ dog }: GridItemProps) {
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
            <button className="btn--secondary">
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
