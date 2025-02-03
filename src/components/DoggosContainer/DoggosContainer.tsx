import React, { useState } from "react";
import DoggosGrid from "../DoggosGrid/DoggosGrid";
import SelectedDoggosList from "../SelectedDoggosList/SelectedDoggosList";
import { DoggosContainerContext, IDog } from "./DoggosContainerContext";
// import { SortFields } from "../../enum/sortFields";
// import { SortDirection } from "../../enum/sortDirections";

import "./DoggosContainer.scss";

export default function DoggosContainer() {
  const [dogs, setDogs] = useState<IDog[]>([]);
  // const [breeds, setBreeds] = useState<string[]>([]);
  // const [selectedDogs, setSelectedDogs] = useState<IDog[]>();
  // const [currentPage, setCurrentPage] = useState(0);
  // const [sortField, setSortField] = useState(SortFields.Breed);
  // const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);
  // const [filterField, setFilterField] = useState(undefined);
  // const [filterValue, setFilterValue] = useState(undefined);

  const initialCtxValue = {
    dogs,
    setDogs,
    // breeds,
    // setBreeds,
    // selectedDogs,
    // setSelectedDogs,
    // currentPage,
    // setCurrentPage,
    // sortField,
    // setSortField,
    // sortDirection,
    // setSortDirection,
    // filterField,
    // setFilterField,
    // filterValue,
    // setFilterValue,
  };

  return (
    <section className="doggos-container">
      <DoggosContainerContext.Provider value={initialCtxValue}>
        <DoggosContainerContext.Consumer>
          {(value) => (
            <>
              <DoggosGrid />
              <SelectedDoggosList />
            </>
          )}
        </DoggosContainerContext.Consumer>
      </DoggosContainerContext.Provider>
    </section>
  );
}
