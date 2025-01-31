import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppContext } from "./AppContext";
import { Themes } from "./components/enum/themes";

import Header from './components/Header/Header';
import LoginForm from "./components/LoginForm/LoginForm";

import "./themes/index.scss";
import "./App.scss";

export default function App() {
  const [user, setUser] = useState<string>('');
  const [theme, setTheme] = useState<string>(Themes.Light);

  const appCtx = {
    user,
    setUser,
    theme,
    setTheme,
  };

  useEffect(() => {
    const docBody = document.body;
    docBody.classList.toggle(Themes.Light, theme === Themes.Light);
    docBody.classList.toggle(Themes.Dark, theme === Themes.Dark);
  }, [theme]);

  return (
    <AppContext.Provider value={appCtx}>
      <AppContext.Consumer>
        {(value) => (
          <div className="App">
            <div className="content-container">
              <Header />
              <main className="main-content">
                <Router>
                  <Routes>
                    <Route path="/" element={ <LoginForm /> } />
                  </Routes>
                </Router>
              </main>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}
