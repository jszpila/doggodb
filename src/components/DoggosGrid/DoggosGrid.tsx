import React, { useContext, useEffect, useState } from "react";
import { RequestStatus } from "../../enum/requestStatus";
import { DoggosContainerContext, IDog } from "../DoggosContainer/DoggosContainerContext";
import { SortField } from "../../enum/sortField";
import { SortDirection } from "../../enum/sortDirection";
import { FiFrown, FiRefreshCw, FiSearch } from "react-icons/fi";
import DogsApi from "../../api/dogs";
import FilterControls from "./FilterControls/FilterControls";
import SortControls from "./SortControls/SortControls";
import Paginator from "./Paginator/Paginator";
import GridItem from "./GridItem/GridItem";

import "./DoggosGrid.scss";

export default function DoggosGrid() {
  const [breedsRequestStatus, setBreedsRequestStatus] = useState(RequestStatus.Idle);
  const [dogsRequestStatus, setDogsRequestStatus] = useState(RequestStatus.Idle);

  const context = useContext(DoggosContainerContext);  

  function populateZipCodeList(dogs: IDog[]) {
    const zips: string[] = [];

    dogs.forEach(({zip_code}) => {
      if (!zips.includes(zip_code)) zips.push(zip_code);
    });

    context.setZipCodes(zips);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        if (breedsRequestStatus === RequestStatus.Idle) {
          setBreedsRequestStatus(RequestStatus.InProgress);
          const breeds = await DogsApi.getBreeds();

          setBreedsRequestStatus(RequestStatus.Success);
          context.setBreeds(breeds);
        }
      } catch (error) {
        console.error(error);
        setBreedsRequestStatus(RequestStatus.Error)
      }
    }

    fetchBreeds();
  }, [breedsRequestStatus, context]);

  useEffect(() => {
    const fetchDogs = async() => {
      try {
        if (dogsRequestStatus === RequestStatus.Idle) {
          const initialSearchParams = {
            from: 0,
            sortField: SortField.Breed,
            sortDirection: SortDirection.Ascending,
          };

          setDogsRequestStatus(RequestStatus.InProgress);
          // NOTE: dogs jumping through hoops is a clever programming metaphor
          const prerequisiteData = await DogsApi.getDogs(initialSearchParams);
          const presentableData = await DogsApi.postDogs(prerequisiteData.resultIds);
          
          context.setDogs(presentableData);
          setDogsRequestStatus(RequestStatus.Success);
          populateZipCodeList(presentableData);
        }
      } catch (error) {
        console.error(error);
        setDogsRequestStatus(RequestStatus.Error);
      }
    }

    fetchDogs();
  }, [dogsRequestStatus, context]);

  function handleSearch() {
    console.log('search');
  }

  return (
    <div className="doggos-grid__container">
      <form className="doggos-grid__form">
        <div className="doggos-grid__controls">
          <FilterControls />
          <div className="form-row">
            <div className="form-row__half">
              <SortControls />
            </div>
            <div className="form-row__half form-row__half--lower-right">
              <button type="button" className="btn--primary" onClick={handleSearch}>
                <FiSearch />&nbsp; Search Doggos
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="doggos-grid__body">
        {dogsRequestStatus === RequestStatus.Error && (
          <span>
            <FiFrown />
            Error loading dogs
          </span>
        )}
        {dogsRequestStatus === RequestStatus.InProgress && (
          <span>
            <FiRefreshCw />
            Loading...
          </span>
        )}
        {dogsRequestStatus === RequestStatus.Success &&
          context.dogs.length === 0 && <span>No dogs found 🤔</span>}
        {dogsRequestStatus === RequestStatus.Success &&
          context.dogs.length > 0 && (
            <>
              {context.dogs.map((dog) => (
                <GridItem key={dog.id} dog={dog} />
              ))}
            </>
          )}
        {/* <GridItem dog={dog} /> */}
      </div>
    </div>
  );
}
