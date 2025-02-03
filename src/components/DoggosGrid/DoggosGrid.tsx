import React, { useContext, useEffect, useState } from "react";
import { RequestStatus } from "../../enum/requestStatus";
import { DoggosContainerContext, IDog } from "../DoggosContainer/DoggosContainerContext";
import { SortField } from "../../enum/sortField";
import { SortDirection } from "../../enum/sortDirection";
import { FiFrown, FiRefreshCw } from "react-icons/fi";
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
          console.log(dogsRequestStatus)
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
        }
      } catch (error) {
        console.error(error);
        setDogsRequestStatus(RequestStatus.Error);
      }
    }

    fetchDogs();
  }, [dogsRequestStatus, context]);

  return (
    <div className="doggos-grid__container">
      <div className="doggos-grid__controls">
        <FilterControls />
        <SortControls />
      </div>
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
                <GridItem key={dog.id} dog={ dog } />
              ))}
            </>
          )}
        {/* <GridItem dog={dog} /> */}
      </div>
    </div>
  );
}
