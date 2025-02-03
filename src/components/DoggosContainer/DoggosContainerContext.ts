/* eslint-disable @typescript-eslint/no-unused-vars */
// NOTE: eslint complains about unused vars in method signatures in the createContext call 

import React, { Dispatch, SetStateAction } from "react";
import { SortFields } from "../../enum/sortFields";
import { SortDirection } from "../../enum/sortDirections";

export interface IDog {
  id: string;
  img: string;
  name: string;
  age: string;
  zip_code: string;
  breed: string;
}

export interface IDoggosContainerContext {
  dogs: IDog[];
  setDogs: Dispatch<SetStateAction<IDog[]>>;
  // breeds: Array<string>;
  // setBreeds: Dispatch<SetStateAction<string[]>>;
  // selectedDogs: IDog[];
  // setSelectedDogs: Dispatch<SetStateAction<IDog[]>>;
  // currentPage: number;
  // setCurrentPage: Dispatch<SetStateAction<number>>;
  // sortField: string;
  // setSortField: Dispatch<SetStateAction<string>>;
  // sortDirection: string;
  // setSortDirection: Dispatch<SetStateAction<string>>;
  // filterField: string | undefined;
  // setFilterField: Dispatch<SetStateAction<string | undefined>>;
  // filterValue: string | undefined;
  // setFilterValue: Dispatch<SetStateAction<string | undefined>>;
}

// TODO: isolate grid-specific context to its own file
//  but that is a bit much for the purposes of this exercise
export const DoggosContainerContext = React.createContext({
  dogs: [],
  setDogs: (dogs: IDog[]): void => {},
  // breeds: [],
  // setBreeds: (breeds: string[]): void => {},
  // selectedDogs: [],
  // setSelectedDogs: (dogs: IDog[]): void => {},
  // currentPage: 0,
  // setCurrentPage: (): void => {},
  // sortField: SortFields.Breed,
  // setSortField: (): void => {},
  // sortDirection: SortDirection.Ascending,
  // setSortDirection: (): void => {},
  // filterField: undefined,
  // setFilterField: (): void => {},
  // filterValue: undefined,
  // setFilterValue: (): void => {},
});
