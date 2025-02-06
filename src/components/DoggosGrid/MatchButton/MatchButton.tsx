import React, { useContext } from "react";
import { DoggosContainerContext } from "../../DoggosContainer/DoggosContainerContext";

import './MatchButton.scss';

interface IProps {
  onGetMatch: () => void,
}

export default function MatchButton({ onGetMatch}: IProps) {
  const { selectedDogs } = useContext(DoggosContainerContext);

  function handleGetMatch(): void {
    onGetMatch();
  }

  return (
    <div className="match-button">
      { selectedDogs.length === 0 ? (
        <span className="match-button__message">Heart some dogs to generate a match!</span>
        ) : (
          <button 
            type="button" 
            className="btn--primary"
            onClick={handleGetMatch}>
              Get A Match!
          </button>
        )}
    </div>
  );
}
