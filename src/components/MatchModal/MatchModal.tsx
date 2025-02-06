import React, { useContext } from "react";
import { DoggosContainerContext } from "../DoggosContainer/DoggosContainerContext";

import "./MatchModal.scss";

export default function MatchModal() {
  const { match, setShouldShowMatchModal } = useContext(DoggosContainerContext);

  function handleClose() {
    setShouldShowMatchModal(false);
  }

  return (
    <div className="match-modal">
      <div className="match-modal__body">
        <h3 className="match-modal__title">Congratulations!</h3>
        <p className="match-modal__message">
          You&apos;ve been matched with{" "}
          <span className="match-modal__name">{match?.name}</span>,
          a {match?.age} year old {match?.breed}! Good job!
        </p>
        <div className="match-modal__img-wrapper">
          <img
            className="match-modal__img"
            src={match?.img}
            alt={`${match?.name} | ${match?.age} | ${match?.breed}`}
          />
        </div>
        <div className="match-modal__buttons">
          <button className="btn--primary" onClick={handleClose}>
            Hooray!
          </button>
        </div>
      </div>
    </div>
  );
}
