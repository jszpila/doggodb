import React from "react";
// import React, { useContext, useMemo, useState } from "react";
// import { RequestStatus } from "../../enum/requestStatus";
// import { DoggosContainerContext } from "../DoggosContainer/DoggosContainerContext";
// import DogsApi from "../../api/dogs";

import "./DoggosGrid.scss";

export default function DoggosGrid() {
  // const [breedsRequestStatus, setBreedsRequestStatus] = useState(RequestStatus.Idle);
  // const [dogsRequestStatus, setDogsRequestStatus] = useState(RequestStatus.Idle);
  // const [hasInitialLoadCompleted, setHasInitialLoadCompleted] = useState(false);

  // const context = useContext(DoggosContainerContext);

  // useMemo(() => {
  //   setBreedsRequestStatus(RequestStatus.InProgress);
  //   setDogsRequestStatus(RequestStatus.InProgress);

  //   // NOTE: using callbacks to enable communication between API and context
  //   DogsApi.getBreeds((() => setBreedsRequestStatus(RequestStatus.Error)).then(res => {
  //     context.setBreeds(res);
  //     setBreedsRequestStatus(RequestStatus.Success);
  //   }));

  //   DogsApi.getDogsSearch({ errorCallback: () => setDogsRequestStatus(RequestStatus.Error) }).then(res => {
  //     context.setDogs(res);
  //     setDogsRequestStatus(RequestStatus.Success);
  //   });

  //   setHasInitialLoadCompleted(breedsRequestStatus === RequestStatus.Success && dogsRequestStatus === RequestStatus.Success)
  // }, [context]);

  return (
    <div className="doggos-grid">
      {/* TODO: filters */}
      {/* TODO: incremental loading */}
      {/* TODO: error */}
      {/* {!hasInitialLoadCompleted && (
        <>Loading...</>
      )}
      {hasInitialLoadCompleted && (
          <table className="doggos-grid__table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Age</th>
                <th>Breed</th>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <ul className="doggos-grid__paginator-list"></ul>
                </td>
              </tr>
            </tfoot>
          </table>
        )} */}
    </div>
  );
}
