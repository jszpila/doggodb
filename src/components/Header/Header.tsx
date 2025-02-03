

import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { Theme } from '../../enum/theme';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import AuthApi from "../../api/auth";
import { useNavigate } from "react-router-dom";

import './Header.scss';

export default function Header() {
  const [icon, setIcon] = useState(<FiMoon />);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout() {
    const logoutSucceeded = await AuthApi.logout();

    if (logoutSucceeded) {
      context.setUser(undefined);
      navigate('/');
    }
  }

  function handleThemeChange(): void { 
    setIcon(context.theme === Theme.Light ? <FiSun /> : <FiMoon />)
    context.setTheme(context.theme === Theme.Light ? Theme.Dark : Theme.Light);
  }

  return (
    <header className="header">
      <div className="header__title-container">
        <h1 className="header__title">DoggoDB™</h1>
        <h2 className="header__subtitle">Find Your Furry Friend</h2>
      </div>
      <div className="header__nav-container">
        {context.user && (
          <>
            <span>Hello, {context.user.name}!</span>
            <button
              type="button"
              className="btn--tertiary"
              onClick={handleLogout}
            >
              <FiLogOut />
            </button>
          </>
        )}

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