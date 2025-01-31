

import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { Themes } from '../enum/themes';
import { FiSun, FiMoon } from 'react-icons/fi';

import './Header.scss';

export default function Header() {
  const [icon, setIcon] = useState(<FiMoon />);
  const context = useContext(AppContext);

  function handleThemeChange(): void { 
    setIcon(context.theme === Themes.Light ? <FiSun /> : <FiMoon />)
    context.setTheme(context.theme === Themes.Light ? Themes.Dark : Themes.Light);
  }

  return (
    <header className="header">
      <div className="header__title-container">
        <h1 className="header__title">DoggoDB™</h1>
        <h2 className="header__subtitle">Find Your Furry Friend</h2>
      </div>
      <div className="header__nav-container">
        <button
          type="button"
          className="btn--tertiary"
          onClick={handleThemeChange}
        >
          {icon}
        </button>
      </div>
    </header>
  );
}