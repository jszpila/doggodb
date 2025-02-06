import React, { useState } from "react";
import { SortField } from "../../enum/sortField";
import { SortDirection } from "../../enum/sortDirection";
import DoggosGrid from "../DoggosGrid/DoggosGrid";
import { DoggosContainerContext, IDog } from "./DoggosContainerContext";
import { FilterField } from "../../enum/filterField";
import MatchModal from "../MatchModal/MatchModal";
import { createPortal } from "react-dom";

import "./DoggosContainer.scss";

export default function DoggosContainer() {
  const [dogs, setDogs] = useState<IDog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedDogs, setSelectedDogs] = useState<IDog[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState(SortField.Breed);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);
  const [filterField, setFilterField] = useState(FilterField.None);
  const [filterValue, setFilterValue] = useState<string | string[] | undefined>(undefined);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [match, setMatch] = useState<IDog | undefined>(undefined);
  const [shouldShowMatchModal, setShouldShowMatchModal] = useState(false);

  const initialCtxValue = {
    dogs,
    setDogs,
    breeds,
    setBreeds,
    selectedDogs,
    setSelectedDogs,
    currentPage,
    setCurrentPage,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    filterField,
    setFilterField,
    filterValue,
    setFilterValue,
    zipCodes,
    setZipCodes,
    match,
    setMatch,
    shouldShowMatchModal,
    setShouldShowMatchModal,
  };

  return (
    <section className="doggos-container">
      {shouldShowMatchModal.toString()}
      <DoggosContainerContext.Provider value={initialCtxValue}>
        <DoggosContainerContext.Consumer>
          {(value) => (
            <div id="DoggosContainer">
              <DoggosGrid />

              {shouldShowMatchModal && createPortal(
                <MatchModal />,
                document.body,
              )}
            </div>
          )}
        </DoggosContainerContext.Consumer>
      </DoggosContainerContext.Provider>
    </section>
  );
}
