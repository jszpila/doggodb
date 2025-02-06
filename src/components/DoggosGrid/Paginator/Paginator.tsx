import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import './Paginator.scss';

interface IProps {
  curPage: number;
  numPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Paginator({curPage, numPages, onNext, onPrev}: IProps) {
  function handlePrevious() {
    onPrev();
  }

  function handleNext() {
    onNext();
  }

  return (
    <div className="paginator">
      <div className="paginator__box">
        <button
          type="button"
          className="btn--secondary"
          onClick={handlePrevious}
          disabled={curPage === 1}
        >
          <FiChevronLeft />
        </button>
      </div>
      <div className="paginator__box">Page {curPage} of {numPages}</div>
      <div className="paginator__box">
        <button 
          type="button" 
          className="btn--secondary" 
          onClick={handleNext}
          disabled={curPage === (numPages - 1)}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
