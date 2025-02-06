import React, { useContext } from "react";
import { SortField } from "../../../enum/sortField";
import { SortDirection } from "../../../enum/sortDirection";
import { DoggosContainerContext } from "../../DoggosContainer/DoggosContainerContext";

import "./SortControls.scss";

export default function SortControls() {
  const context = useContext(DoggosContainerContext); 

  function handleSortFieldChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    context.setSortField(event.currentTarget.value as SortField);
  }

  function handleSortDirectionChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    context.setSortDirection(event.currentTarget.value as SortDirection);
  }

  return (
    <div className="sort-controls">
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
