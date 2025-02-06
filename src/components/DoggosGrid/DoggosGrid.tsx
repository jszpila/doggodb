import React, { useContext, useEffect, useState } from "react";
import { RequestStatus } from "../../enum/requestStatus";
import { DoggosContainerContext, IDog } from "../DoggosContainer/DoggosContainerContext";
import { SortField } from "../../enum/sortField";
import { SortDirection } from "../../enum/sortDirection";
import { FiFrown, FiRefreshCw, FiSearch } from "react-icons/fi";
import DogsApi, { IGetDogsParams } from "../../api/dogs";
import FilterControls from "./FilterControls/FilterControls";
import SortControls from "./SortControls/SortControls";
import Paginator from "./Paginator/Paginator";
import GridItem from "./GridItem/GridItem";

import "./DoggosGrid.scss";
import { RequestAction } from "../../enum/requestAction";

export default function DoggosGrid() {
  // TODO: support user-configurable page size
  const PAGE_SIZE = 25;

  const context = useContext(DoggosContainerContext);  

  const [breedsRequestStatus, setBreedsRequestStatus] = useState(RequestStatus.Idle);
  const [dogsRequestStatus, setDogsRequestStatus] = useState(RequestStatus.Idle);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  const fetchDogs = async (
      params: IGetDogsParams, 
      allowedStatus: RequestStatus,
      successCb?: () => void) => {
    try {
      if (dogsRequestStatus === allowedStatus) {
        setDogsRequestStatus(RequestStatus.InProgress);
        const dogIdsResults = await DogsApi.getDogs(params);
        const dogsResults = await DogsApi.postDogs(dogIdsResults.resultIds);

        setNumPages(Math.ceil(dogIdsResults.total / PAGE_SIZE));
        setNextUrl(dogIdsResults.next);
        setPrevUrl(dogIdsResults?.prev || '');
        context.setDogs(dogsResults);
        setDogsRequestStatus(RequestStatus.Success);

        if (successCb) successCb();
      }
    } catch (error) {
      console.error(error);
      setDogsRequestStatus(RequestStatus.Error);
    }
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
    fetchDogs({
      from: 0,
      sortField: SortField.Breed,
      sortDirection: SortDirection.Ascending,
      requestAction: RequestAction.Initial,
    },
    RequestStatus.Idle,
    () => { setCurrentPage(currentPage + 1)});
  }, [dogsRequestStatus, context]);

  function handleSearch() {
    const { filterValue, sortField, sortDirection} = context;
    const params: IGetDogsParams = {
      sortField: sortField as SortField,
      sortDirection: sortDirection as SortDirection,
      requestAction: RequestAction.Initial,
    }

    // TODO: support for:
    // - additional filters
    // - multiple values for zip, breeds filters
    if (filterValue) {
      params.breeds = filterValue;
    }

    setCurrentPage(0);

    fetchDogs(
      params, 
      RequestStatus.Success,
      () => { setCurrentPage(1) }
    );
  }

  function handleNext() {
    fetchDogs(
      { nextUrl, requestAction: RequestAction.Next },
      RequestStatus.Success,
      () => { setCurrentPage(currentPage + 1) }
    );
  }

  function handlePrevious() {
    fetchDogs(
      { prevUrl, requestAction: RequestAction.Previous }, 
      RequestStatus.Success,
      () => { setCurrentPage(currentPage - 1) }
    );
  }

  function handleFavorite(selectedDog: IDog) {
    const {selectedDogs, setSelectedDogs} = context;
    let tmpDogs: IDog[] = selectedDogs;


    if (!selectedDogs.find((dog) => dog.id === selectedDog.id)) {
      tmpDogs.push(selectedDog);
    } else {
      tmpDogs = tmpDogs.filter((dog) => dog.id !== selectedDog.id);
    }

    setSelectedDogs(tmpDogs)
  }

  return (
    <div className="doggos-grid__container">
      <form className="doggos-grid__form">
        <div className="doggos-grid__controls">
          <FilterControls />
          <SortControls />
          <button
            type="button"
            className="btn--primary"
            disabled={dogsRequestStatus === RequestStatus.InProgress}
            onClick={handleSearch}
          >
            <FiSearch />
            &nbsp; Search Doggos
          </button>
        </div>
      </form>
      <Paginator
        curPage={currentPage}
        numPages={numPages}
        onNext={handleNext}
        onPrev={handlePrevious}
      />
      <div className="doggos-grid__body">
        {dogsRequestStatus === RequestStatus.Error && (
          <span>
            <FiFrown />
            &nbsp; Error loading dogs
          </span>
        )}
        {dogsRequestStatus === RequestStatus.InProgress && (
          <span>
            <FiRefreshCw />
            &nbsp; Loading...
          </span>
        )}
        {dogsRequestStatus === RequestStatus.Success &&
          context.dogs.length === 0 && <span>No dogs found 🤔</span>}
        {dogsRequestStatus === RequestStatus.Success &&
          context.dogs.length > 0 && (
            <>
              {context.dogs.map((dog) => (
                <GridItem 
                  key={dog.id} 
                  dog={dog} 
                  onFavorite={handleFavorite} />
              ))}
            </>
          )}
      </div>
    </div>
  );
}
