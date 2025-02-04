import React from "react";
import { SortField } from "../../../enum/sortField";
import { SortDirection } from "../../../enum/sortDirection";

import "./SortControls.scss";

export default function SortControls() {

  function handleSortFieldChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    console.log(event.currentTarget.value)
  }

  function handleSortDirectionChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    console.log(event.currentTarget.value);
  }

  return (
    <div className="sort-controls">
      <h4 className="controls-title">Sort</h4>
        <div className="controls-container">
          <div className="control-container">
            <label htmlFor="SortField" className="control-label">
              Sort By
            </label>
            <select
              className="control--select"
              id="SortField"
              name="SortField"
              defaultValue={SortField.Breed}
              onChange={handleSortFieldChange}
            >
              <option value={SortField.Breed}>Breed</option>
              <option value={SortField.Age}>Age</option>
              <option value={SortField.Name}>Name</option>
            </select>
          </div>
          <div className="control-container">
            <label htmlFor="SortField" className="control-label">
              Sort Direction
            </label>
            <select
              className="control--select"
              id="SortDirection"
              name="SortDirection"
              defaultValue={SortDirection.Ascending}
              onChange={handleSortDirectionChange}
            >
              <option value={SortDirection.Ascending}>Ascending</option>
              <option value={SortDirection.Descending}>Descending</option>
            </select>
          </div>
        </div>
      </div>
  );
}
