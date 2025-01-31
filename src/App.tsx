import React from 'react';
import './themes/index.scss'
import './App.scss';

import Header from './components/Header/Header';

export default function App() {
  return (
    <div className="App">
      <div className="content-container">
        <Header />
        <main className="main-content">

        </main>
      </div>
    </div>
  );
}
