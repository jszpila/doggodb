import React, { useContext, useState } from "react";
import { DoggosContainerContext } from "../../DoggosContainer/DoggosContainerContext";

import './FilterControls.scss';

export default function FilterControls() {
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [minAge, setMinAge] = useState<string | undefined>(undefined);
  const [maxAge, setMaxAge] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [selectedZipCodes, setSelectedZipCodes] = useState([]);

  const context = useContext(DoggosContainerContext);

  function handleBreedsFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    console.log(event.currentTarget.value);
  }

  function handleZipCodesChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    console.log(event.currentTarget.value);
  }

  return (
    <div className="filter-controls">
      <h4 className="controls-title">Filters</h4>
      <div className="controls-wrapper">
        <div className="control-container">
          <label htmlFor="BreedsFilter" className="control-label">
            Breeds
          </label>
          <select
            multiple
            size={1}
            className="control--select"
            id="BreedsFilter"
            name="BreedsFilter"
            defaultValue={context.breeds[0]}
            onChange={handleBreedsFilterChange}
          >
            {context.breeds.map((breed, i) => (
              <option key={i} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
        <div className="control-container">
          <label htmlFor="ZipCodesFilter" className="control-label">
            Zip Codes
          </label>
          <select
            multiple
            size={1}
            className="control--select"
            id="ZipCodesFilter"
            name="ZipCodesFilter"
            defaultValue={context.breeds[0]}
            onChange={handleZipCodesChange}
          >
            {context.zipCodes.map((zip, i) => (
              <option key={i} value={zip}>
                {zip}
              </option>
            ))}
          </select>
        </div>
        <div className="control-container">
          <label htmlFor="MinAgeFilter" className="control-label">
            Minimum Age
          </label>
          <input
            type="number"
            className="control--number"
            id="MinAgeFilter"
            name="MinAgeFilter"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
        </div>
        <div className="control-container">
          <label htmlFor="MaxAgeFilter" className="control-label">
            Maximum Age
          </label>
          <input
            type="number"
            className="control--number"
            id="MaxAgeFilter"
            name="MaxAgeFilter"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>
        <div className="control-container">
          <label htmlFor="NameFilter" className="control-label">
            Name
          </label>
          <input
            type="text"
            className="control--text"
            id="NameFilter"
            name="NameFilter"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
