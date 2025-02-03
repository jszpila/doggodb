import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AppContext } from "./AppContext";
import { Themes } from "./enum/themes";
import { IUser } from "./interfaces/user";

import Header from './components/Header/Header';
import LoginForm from "./components/LoginForm/LoginForm";
import NotFound from './components/NotFound/NotFound';
import DoggosContainer from "./components/DoggosContainer/DoggosContainer";

import "./themes/index.scss";
import "./App.scss";

export default function App() {
  const [user, setUser] = useState<IUser>();
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

  const WrappedDoggosComponent = () => {
    return appCtx.user ? <DoggosContainer /> : <Navigate to="/" />;
  };

  return (
    <AppContext.Provider value={appCtx}>
      <AppContext.Consumer>
        {(value) => (
          <Router>
            <div className="App">
              <div className="content-container">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/doggos" element={<WrappedDoggosComponent />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        )}
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}
