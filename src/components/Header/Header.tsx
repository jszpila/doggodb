

import React from 'react';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__title-container">
        <h1 className="header__title">DoggoDB™</h1>
        <h2 className="header__subtitle">Find Your Furry Friend</h2>
      </div>
      <div className="header__nav-container">BUTTONS!</div>
    </header>
  );
}