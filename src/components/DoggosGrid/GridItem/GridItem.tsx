import React from "react";
import { IDog } from "../../DoggosContainer/DoggosContainerContext";

import './GridItem.scss';

interface GridItemProps {
  dog: IDog,
}

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
        </div>
      </div>
    </div>
  );
}
