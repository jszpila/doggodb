import React, { useContext } from "react";
import { DoggosContainerContext } from "../../DoggosContainer/DoggosContainerContext";
import { FilterField } from "../../../enum/filterField";

import './FilterControls.scss';

export default function FilterControls() {
  const context = useContext(DoggosContainerContext);

  function handleBreedsFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    context.setFilterField(FilterField.Breeds);
    context.setFilterValue([event.currentTarget.value])
  }

  return (
    <div className="filter-controls">
      <div className="controls-wrapper">
        <div className="control-container">
          <label htmlFor="BreedsFilter" className="control-label">
            Filter by Breed:
          </label>
          {/* TODO: multiple selection */}
          <select
            className="control--select"
            id="BreedsFilter"
            name="BreedsFilter"
            onChange={handleBreedsFilterChange}
          >
            <option value=''>No Filter Applied</option>
            {context.breeds.map((breed, i) => (
              <option key={i} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* TODO: min age, max age, name, name, zip filters */}
    </div>
  );
}
