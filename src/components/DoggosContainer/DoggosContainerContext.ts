/* eslint-disable @typescript-eslint/no-unused-vars */
// NOTE: eslint complains about unused vars in method signatures in the createContext call 

import React, { Dispatch, SetStateAction } from "react";
import { SortField } from "../../enum/sortField";
import { SortDirection } from "../../enum/sortDirection";
import { FilterField } from "../../enum/filterField";

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
  breeds: string[];
  setBreeds: Dispatch<SetStateAction<string[]>>;
  selectedDogs: IDog[];
  setSelectedDogs: Dispatch<SetStateAction<IDog[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sortField: string;
  setSortField: Dispatch<SetStateAction<SortField>>;
  sortDirection: string;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  filterField: string | undefined;
  setFilterField: Dispatch<SetStateAction<FilterField>>;
  filterValue: string | undefined;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

const initialContext: IDoggosContainerContext = {
  dogs: [],
  setDogs: () => {},
  breeds: [],
  setBreeds: () => {},
  selectedDogs: [],
  setSelectedDogs: () => {},
  currentPage: 0,
  setCurrentPage: () => {},
  sortField: SortField.Breed,
  setSortField: () => {},
  sortDirection: SortDirection.Ascending,
  setSortDirection: () => {},
  filterField: FilterField.None,
  setFilterField: () => {},
  filterValue: '',
  setFilterValue: () => {},
};

export const DoggosContainerContext = React.createContext(initialContext);

